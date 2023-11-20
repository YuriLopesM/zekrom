package com.zekron.api.model;

import javax.persistence.*;

@Entity
public class CompTime extends BaseEntity {
    @Column(name = "month", nullable = false)
    private Integer month;
    @Column(name = "year", nullable = false)
    private Integer year;
    @Column(name = "hours", nullable = false)
    private Integer hours;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "CompTime{" +
                "month=" + month +
                ", year=" + year +
                ", hours=" + hours +
                ", user=" + user +
                '}';
    }
}
