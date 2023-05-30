package com.virginonline.backend.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TestController {
    @GetMapping("/hello")
    public String getHello() {
        log.info("try");
        return "hello";
    }
}
