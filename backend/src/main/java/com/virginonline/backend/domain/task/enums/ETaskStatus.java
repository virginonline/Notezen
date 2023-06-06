package com.virginonline.backend.domain.task.enums;

import java.util.Arrays;

public enum ETaskStatus {
    PLANNED,
    IN_PROGRESS,
    COMPLETE,
    PAUSE;

    public static ETaskStatus findValue(String value) {
        return Arrays.stream(ETaskStatus.values()).filter(status -> status.toString().equals(value)).findFirst().orElseThrow();
    }

}
