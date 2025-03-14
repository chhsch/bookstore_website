package api;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.io.StringWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Jersey: Manage all validation exceptions that emerge from an API.
 */

//@Provider – Registers this class as a JAX-RS component

@Provider
@Priority(Priorities.USER)
//Handles ApiException and converts it into an HTTP response.
public class ApiExceptionHandler implements ExceptionMapper<ApiException> {

    private Logger logger = Logger.getLogger(ApiExceptionHandler.class.getName());

    /**
     * This method determines the HTTP status code.
     * If the exception is a ValidationFailure, it returns a 400 Bad Request.
     * Otherwise, it defaults to 500 Internal Server Error.
     */
    @Override
    public Response toResponse(ApiException exception) {
        Response.Status status = Response.Status.INTERNAL_SERVER_ERROR;
        if (exception instanceof ApiException.ValidationFailure) {

            status = Response.Status.BAD_REQUEST;
        }
        return makeResponse(exception, status);
    }

    // Response Formatting
    private Response makeResponse(Exception exception, Response.Status status) {
        try {
            // Construct a custom error message
            StringWriter writer = new StringWriter();
            writer.append(status.getReasonPhrase()).append(" ")
                    .append(String.valueOf(status.getStatusCode())).append("\n\n")
                    .append(exception.getMessage());

            return Response.status(status)
                    .entity(writer.getBuffer().toString())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
        } catch (Exception e) {
            // First log: Captures an issue while formatting the response.
            logger.log(Level.INFO, e, () -> "Problem attempting to map an Exception to a json response");

            // Second log: Records the original exception details.
            logger.log(Level.INFO, exception, () -> "Original Exception");

            // Returns a generic 500 Internal Server Error response.
            return Response.serverError().build();
        }
    }

}
