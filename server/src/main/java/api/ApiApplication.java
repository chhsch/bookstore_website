package api;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
//This class defines the entry point for Jakarta RESTful Web Services (JAX-RS) API.

//This annotation sets the base path for all REST endpoints.
@ApplicationPath("/api")
public class ApiApplication extends Application {}
