package com.virginonline.backend.exception;


import lombok.Getter;

public class ApiException extends RuntimeException {

    @Getter
    private final String errorCode;

    public ApiException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
