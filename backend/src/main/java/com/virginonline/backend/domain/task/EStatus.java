package com.virginonline.backend.domain.task;

public enum EStatus {
    NOT_STARTED("Не начат"),
    COMPLETE("Завершен"),
    PAUSE("Приостановлен"),
    IN_PROGRESS("В прогрессе");
    private final String statusName;

    EStatus(String statusName) {
        this.statusName = statusName;
    }
    public String getName() {
        return this.statusName;
    }
}
