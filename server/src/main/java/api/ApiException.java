package api;

public class ApiException extends RuntimeException {
    //First constructor: Allows passing a custom error message.
    public ApiException(String message) {
        super(message);
    }

    //Second constructor: Allows passing a message and a cause (another exception).
    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }

    //This subclass is used specifically for validation errors, like incorrect input fields.
    public static class ValidationFailure extends ApiException {
        //Stores the name of the invalid field
        //Helps identify which input field caused the validation error.
        private String fieldName = null;

        public ValidationFailure(String message) {
            super(message);
        }

        //Passes an error message and the original exception.
        public ValidationFailure(String message, Throwable t) {
            super(message, t);
        }
        
        //Stores the specific field name that caused the error.
        public ValidationFailure(String fieldName, String message) {
            super(message);
            this.fieldName = fieldName;
        }

        public ValidationFailure(String fieldName, String message, Throwable cause) {
            super(message, cause);
            this.fieldName = fieldName;
        }

        public String getFieldName() {
            return fieldName;
        }

        public boolean isFieldError() {
            return fieldName != null && !fieldName.isEmpty();
        }
    }
}