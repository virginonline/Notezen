package com.virginonline.backend.domain.project;

import java.util.Arrays;

public enum EProjectStatus {
    PLANNED,
    IN_PROGRESS,
    COMPLETE,
    PAUSE;

    public static EProjectStatus findValue(String value) {
        return Arrays.stream(EProjectStatus.values()).filter(status -> status.toString().equals(value)).findFirst().orElseThrow();
    }
}
