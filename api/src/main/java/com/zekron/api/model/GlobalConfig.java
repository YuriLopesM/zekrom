package com.zekron.api.model;

import java.time.LocalDate;

public class GlobalConfig {
    private Long id;
    private Integer minutesToExtraHour;
    private Integer daysToExpiration;
    private Boolean workingSaturday;
    private Boolean workingSunday;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMinutesToExtraHour() {
        return minutesToExtraHour;
    }

    public void setMinutesToExtraHour(Integer minutesToExtraHour) {
        this.minutesToExtraHour = minutesToExtraHour;
    }

    public Integer getDaysToExpiration() {
        return daysToExpiration;
    }

    public void setDaysToExpiration(Integer daysToExpiration) {
        this.daysToExpiration = daysToExpiration;
    }

    public Boolean getWorkingSaturday() {
        return workingSaturday;
    }

    public void setWorkingSaturday(Boolean workingSaturday) {
        this.workingSaturday = workingSaturday;
    }

    public Boolean getWorkingSunday() {
        return workingSunday;
    }

    public void setWorkingSunday(Boolean workingSunday) {
        this.workingSunday = workingSunday;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "GlobalConfig{" +
                "id=" + id +
                ", minutesToExtraHour=" + minutesToExtraHour +
                ", daysToExpiration=" + daysToExpiration +
                ", workingSaturday=" + workingSaturday +
                ", workingSunday=" + workingSunday +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
