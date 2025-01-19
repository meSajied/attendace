package com.monitor.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class WorkRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private Employee employee;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private long workTime;
  private long outTime;

  private LocalDate date;
  @Enumerated(EnumType.STRING)
  private OfficeType officeType;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Employee getEmployee() {
    return employee;
  }

  public void setEmployee(Employee employee) {
    this.employee = employee;
  }

  public long getWorkTime() {
    return workTime;
  }

  public void setWorkTime(long workTime) {
    this.workTime = workTime;
  }

  public long getOutTime() {
    return outTime;
  }

  public void setOutTime(long outTime) {
    this.outTime = outTime;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public OfficeType getOfficeType() {
    return officeType;
  }

  public void setOfficeType(OfficeType officeType) {
    this.officeType = officeType;
  }

  public LocalDateTime getStartTime() {
    return startTime;
  }

  public void setStartTime(LocalDateTime startTime) {
    this.startTime = startTime;
  }

  public LocalDateTime getEndTime() {
    return endTime;
  }

  public void setEndTime(LocalDateTime endTime) {
    this.endTime = endTime;
  }
}
