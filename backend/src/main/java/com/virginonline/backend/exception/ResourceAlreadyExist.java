package com.virginonline.backend.exception;

public class ResourceAlreadyExist extends RuntimeException {
  public ResourceAlreadyExist(String message) {
    super(message);
  }
}
