package com.grindlaysresort.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

public class PivelageNotGrant extends ResponseStatusException {

    public PivelageNotGrant(HashMap<String,String> message, Exception exception) {
        super(HttpStatus.METHOD_NOT_ALLOWED,String.valueOf(message),exception);
    }
    public PivelageNotGrant(HashMap<String,String> message) {
        this(message,null);
    }
}