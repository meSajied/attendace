package com.monitor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Employee {
  @Id
  @NotNull
  private Long id;
  @Column(unique = true)
  @NotBlank
  private String username;
  private String name;

  @Email(message = "Not a valid email address")
  @Column(unique = true)
  @NotBlank
  private String email;

  @Email(message = "Not a valid email address")
  @Column(unique = true)
  @NotBlank
  private String workEmail;

  private String phone;

  @NotBlank(message = "Password cannot be null")
  private String password;
  private String gender;

  @Enumerated(EnumType.STRING)
  private Role role = Role.EMPLOYEE;
  private String department;
  private String designation;
  private String supervisor;
  private LocalDate joiningDate;

  @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<CheckInRecord> checkInRecord;
  @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<WorkRecord> workRecord;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getWorkEmail() {
    return workEmail;
  }

  public void setWorkEmail(String workEmail) {
    this.workEmail = workEmail;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }

  public String getDesignation() {
    return designation;
  }

  public void setDesignation(String designation) {
    this.designation = designation;
  }

  public String getSupervisor() {
    return supervisor;
  }

  public void setSupervisor(String supervisor) {
    this.supervisor = supervisor;
  }

  public LocalDate getJoiningDate() {
    return joiningDate;
  }

  public void setJoiningDate(LocalDate joiningDate) {
    this.joiningDate = joiningDate;
  }

  public List<CheckInRecord> getCheckInRecord() {
    return checkInRecord;
  }

  public void setCheckInRecord(List<CheckInRecord> checkInRecord) {
    this.checkInRecord = checkInRecord;
  }

  public List<WorkRecord> getWorkRecord() {
    return workRecord;
  }

  public void setWorkRecord(List<WorkRecord> workRecord) {
    this.workRecord = workRecord;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  @Override
  public String toString() {
    return username + " " + name + " " + email + " " + phone + " " + password + " " + gender + " " + department + " " + designation + " " + supervisor + " " + joiningDate + " " + checkInRecord + " " + workRecord + " " + role;
  }
}
