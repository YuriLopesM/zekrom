package com.zekron.api.model;

import java.time.LocalDate;

public class Absence extends BaseEntity{
    private Long typeId;
    private Long userId;
    private String justification;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private LocalDate hourStart;
    private LocalDate hourEnd;

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }

    public LocalDate getHourStart() {
        return hourStart;
    }

    public void setHourStart(LocalDate hourStart) {
        this.hourStart = hourStart;
    }

    public LocalDate getHourEnd() {
        return hourEnd;
    }

    public void setHourEnd(LocalDate hourEnd) {
        this.hourEnd = hourEnd;
    }

    @Override
    public String toString() {
        return "Absence{" +
                "typeId=" + typeId +
                ", userId=" + userId +
                ", justification='" + justification + '\'' +
                ", dateStart=" + dateStart +
                ", dateEnd=" + dateEnd +
                ", hourStart=" + hourStart +
                ", hourEnd=" + hourEnd +
                '}';
    }
}
