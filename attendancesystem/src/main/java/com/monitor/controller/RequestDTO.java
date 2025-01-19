package com.monitor.controller;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.monitor.entity.Checks;
import com.monitor.entity.OfficeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class RequestDTO {

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  private LocalDateTime time;
  private OfficeType officeType;
  private String username;
  @Enumerated(EnumType.STRING)
  private Checks check;

  public LocalDateTime getTime() {
    return time;
  }

  public void setTime(LocalDateTime time) {
    this.time = time;
  }

  public OfficeType getOfficeType() {
    return officeType;
  }

  public void setOfficeType(OfficeType officeType) {
    this.officeType = officeType;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Checks getCheck() {
    return check;
  }

  public void setCheck(Checks check) {
    this.check = check;
  }

  @Override
  public String toString() {
    return "Request{" +
        "time=" + time +
        ", officeType='" + officeType + '\'' +
        ", username=" + username +
        ", check=" + check +
        '}';
  }
}
