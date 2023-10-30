package com.zekron.api.model;

import java.sql.Time;
import java.time.LocalDate;

public class HourPoint extends BaseEntity {
    private Long userId;
    private LocalDate date;
    private Time hour;
    private Integer year;
    private String status;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Time getHour() {
        return hour;
    }

    public void setHour(Time hour) {
        this.hour = hour;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "HourPoint{" +
                "userId=" + userId +
                ", date=" + date +
                ", hour=" + hour +
                ", year=" + year +
                ", status='" + status + '\'' +
                '}';
    }
}
