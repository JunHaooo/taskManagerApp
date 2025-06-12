//when bad data is sent, we want to be able to handle the error and return an user-friendly message, here we are creating a helper class 

package com.taskmanager.server.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice //looks at all controllers and will jump in to handle if any of them throws an error

public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class) //tells spring to handle this specific exception type here. MethodArgumentNotValidException — this exception is thrown when validation on a method argument annotated with @Valid fails

    @ResponseStatus(HttpStatus.BAD_REQUEST) //means the response has status code 400
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex //catch the error, pick the parts that have an issue, return a simple explanation
    ){
        Map<String, String> errors = new HashMap<>(); //errors is not a dictionary with a string key and string value!
        
        // Get all validation errors, grabbing the field name and error message and creating a key-value pair
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            // key = field name, value = error message
            errors.put(error.getField(), error.getDefaultMessage());
        });
        
        // Return a map of field names to error messages
        return errors;
    }
}