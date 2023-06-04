package com.virginonline.backend.domain.task.enums;

import java.util.Arrays;

public enum ETaskPriority {
    HIGH,
    MEDIUM,
    LOW;

    public static ETaskPriority findValue(String value) {
        return Arrays.stream(ETaskPriority.values()).filter(priority -> priority.toString().equals(value)).findFirst().orElseThrow();
    }
}
