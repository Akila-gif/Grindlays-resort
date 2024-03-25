package com.grindlaysresort.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ConflictException extends ResponseStatusException {
    public ConflictException(String error, Exception exception){
        super(HttpStatus.CONFLICT,error,exception);
    }

    public ConflictException(String error){
        this(error,null);
    }
}
