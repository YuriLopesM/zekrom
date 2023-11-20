package com.zekron.api.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class GlobalConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "minutes_to_extra_hour", nullable = false)
    private Integer minutesToExtraHour;
    @Column(name = "days_to_expiration", nullable = false)
    private Integer daysToExpiration;
    @Column(name = "working_saturday", nullable = false)
    private Boolean workingSaturday;
    @Column(name = "working_sunday", nullable = false)
    private Boolean workingSunday;
    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;
    @Column(name = "updated_at", nullable = false)
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
    public String  toString() {
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
