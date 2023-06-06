package com.virginonline.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class BearerToken {
    private String accessToken;
    private String tokenType;

    public BearerToken(String token, String bearer) {
        this.tokenType = bearer;
        this.accessToken = token;
    }
}
