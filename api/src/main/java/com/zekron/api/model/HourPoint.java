package com.zekron.api.model;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;

@Entity
public class HourPoint extends BaseEntity {
    @Column(name = "date", nullable = false)
    private LocalDate date;
    @Column(name = "hour", nullable = false)
    private Time hour;
    @Column(name = "year", nullable = false)
    private Integer year;
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "HourPoint{" +
                "date=" + date +
                ", hour=" + hour +
                ", year=" + year +
                ", status=" + status +
                ", user=" + user +
                '}';
    }
}
