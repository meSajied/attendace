package com.monitor.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class CheckInRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private Employee employee;
  private LocalDateTime time;

  @Enumerated(EnumType.STRING)
  private Checks checks;

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

  public LocalDateTime getTime() {
    return time;
  }

  public void setTime(LocalDateTime time) {
    this.time = time;
  }

  public Checks getChecks() {
    return checks;
  }

  public void setChecks(Checks checks) {
    this.checks = checks;
  }
}
