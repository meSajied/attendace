package com.monitor.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleUsernameNotFoundException(
      UsernameNotFoundException ex, WebRequest request) {
    Map<String, String> errorDetails = new HashMap<>();
    errorDetails.put("message", ex.getMessage());
    errorDetails.put("status", HttpStatus.NOT_FOUND.toString());
    return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleAuthenticationException(
      AuthenticationCredentialsNotFoundException ex, WebRequest request) {
    Map<String, String> errorDetails = new HashMap<>();
    errorDetails.put("message", "Authentication failed: " + ex.getMessage());
    errorDetails.put("status", HttpStatus.FORBIDDEN.toString());
    return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
  }
}