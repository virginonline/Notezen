package com.virginonline.backend.security;

import java.io.Serializable;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class TokenDetails implements Serializable {
    private Long userId;
    private String token;
    private Date issuedAt;
    private Date expiresAt;
}
