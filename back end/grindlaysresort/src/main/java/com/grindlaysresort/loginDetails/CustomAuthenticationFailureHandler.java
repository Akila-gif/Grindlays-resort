package com.grindlaysresort.loginDetails;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {


    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errorMessage = "Invalid username or password";

        if (exception.getMessage().equalsIgnoreCase("Bad credentials")) {
            errorMessage = "Invalid username or password";
        } else if (exception.getMessage().equalsIgnoreCase("User is disabled")) {
            errorMessage = "Your account has been disabled";
        } else if (exception.getMessage().equalsIgnoreCase("User account has expired")) {
            errorMessage = "Your account has expired";
        }

        response.sendRedirect("/login?error=" + errorMessage);
    }

    @Override
    public void onAuthenticationFailure(jakarta.servlet.http.HttpServletRequest request, jakarta.servlet.http.HttpServletResponse response, AuthenticationException exception) throws IOException, jakarta.servlet.ServletException {
        String errorMessage = "Invalid username or password";

        if (exception.getMessage().equalsIgnoreCase("Bad credentials")) {
            errorMessage = "Invalid username or password";
        } else if (exception.getMessage().equalsIgnoreCase("User is disabled")) {
            errorMessage = "Your account has been disabled";
        } else if (exception.getMessage().equalsIgnoreCase("User account has expired")) {
            errorMessage = "Your account has expired";
        }

        response.sendRedirect("/login?error=" + errorMessage);
    }
}
