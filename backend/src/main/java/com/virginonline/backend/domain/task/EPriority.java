package com.virginonline.backend.domain.task;

public enum EPriority {
    HIGH("Высокий"),
    NORMAL("Средний"),
    LOW("Низкий");
    private final String priorityName;
    EPriority(String priorityName) {
        this.priorityName = priorityName;
    }

    public String getName() {
        return this.priorityName;
    }

}
