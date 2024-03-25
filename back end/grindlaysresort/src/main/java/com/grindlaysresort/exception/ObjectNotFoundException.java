package com.grindlaysresort.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;


public class ObjectNotFoundException extends ResponseStatusException {


    public ObjectNotFoundException (HashMap<String,String> message,Exception exception){
        super(HttpStatus.NOT_FOUND, String.valueOf(message),exception);
    }
    public ObjectNotFoundException (HashMap<String,String> message){
        this(message,null);
    }
}
