package com.virginonline.backend.exception;

public class UnauthorizedException extends ApiException {
    public UnauthorizedException(String message, String errorCode) {
        super(message, "USER_UNAUTHORIZED");
    }
}
