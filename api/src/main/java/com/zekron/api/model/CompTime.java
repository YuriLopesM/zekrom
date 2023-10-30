package com.zekron.api.model;

import java.time.LocalDate;

public class CompTime extends BaseEntity {
    private Long userId;
    private Integer month;
    private Integer year;
    private Integer hours;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    @Override
    public String toString() {
        return "CompTime{" +
                ", userId=" + userId +
                ", month=" + month +
                ", year=" + year +
                ", hours=" + hours +
                '}';
    }
}
