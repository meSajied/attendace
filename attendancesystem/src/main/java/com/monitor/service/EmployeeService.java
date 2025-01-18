package com.monitor.service;

import com.monitor.repositories.AdminRepository;
import com.monitor.repositories.ChecksInRepository;
import com.monitor.repositories.EmployeeRepository;
import com.monitor.repositories.WorkRecordRepository;
import com.monitor.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class EmployeeService {
  private final EmployeeRepository employeeRepository;
  private final WorkRecordRepository workRecordRepository;
  private final ChecksInRepository checksInRepository;
  private final AdminRepository adminRepository;
  int code = 0;
  public EmployeeService(EmployeeRepository employeeRepository,
      WorkRecordRepository workRecordRepository,
      ChecksInRepository checksInRepository,
      AdminRepository adminRepository) {
    this.employeeRepository = employeeRepository;
    this.workRecordRepository = workRecordRepository;
    this.checksInRepository = checksInRepository;
    this.adminRepository = adminRepository;
  }

  public Optional<Employee> getEmployeeOfUsernameAndPassword(String username, String password) {
    return employeeRepository.findByUsernameAndPassword(username, password);
  }

  public Optional<Employee> getEmployee(String username) {
    return employeeRepository.findByUsername(username);
  }

  public List<WorkRecord> getWorkRecords() {
    return workRecordRepository.findAllWithEmployeeData();
  }

  public List<WorkRecord> getWorkRecordsThisWeek() {
    LocalDate today = LocalDate.now();
    LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.FRIDAY));
    LocalDate endOfWeek = startOfWeek.plusDays(6);

    return workRecordRepository.findByDateBetween(startOfWeek, endOfWeek);
  }

  public List<WorkRecord> getWorkRecordsThisMonth() {
    LocalDate today = LocalDate.now();
    LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
    LocalDate endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());

    return workRecordRepository.findByDateBetween(startOfMonth, endOfMonth);
  }

  public List<WorkRecord> getWorkRecordsToday() {
    return workRecordRepository.findByDate(LocalDate.now());
  }

  public List<CheckInRecord> checkInRecordsOfEmployee(Long id) {
    return checksInRepository.findByEmployeeId(id);
  }

  public Optional<Employee> updateEmployee(Employee updatedEmployee) {
    Optional<Employee> existingEmployeeOpt = employeeRepository.findById(updatedEmployee.getId());

    if (existingEmployeeOpt.isPresent()) {
      Employee existingEmployee = existingEmployeeOpt.get();

      existingEmployee.setName(updatedEmployee.getName());
      existingEmployee.setEmail(updatedEmployee.getEmail());
      existingEmployee.setPhone(updatedEmployee.getPhone());
      existingEmployee.setGender(updatedEmployee.getGender());
      existingEmployee.setDepartment(updatedEmployee.getDepartment());
      existingEmployee.setDesignation(updatedEmployee.getDesignation());
      existingEmployee.setSupervisor(updatedEmployee.getSupervisor());
      existingEmployee.setJoiningDate(updatedEmployee.getJoiningDate());

      return Optional.of(employeeRepository.save(existingEmployee));
    }

    return Optional.empty();
}

  @Transactional
  public CheckInRecord createCheckInRecord(CheckInRecord checkInRecord) {
    Employee employee = employeeRepository.findById(checkInRecord.getEmployee().getId()).get();
    WorkRecord wr = workRecordRepository.findByEmployeeIdAndDate(employee.getId(), checkInRecord.getTime().toLocalDate()).get();

    if(checkInRecord.getChecks() == Checks.IN) {
      Optional<CheckInRecord> lastCheckout = checksInRepository.findTopByEmployeeIdAndChecksOrderByTimeDesc(
          checkInRecord.getEmployee().getId(), Checks.OUT);

      update(checkInRecord, employee, lastCheckout);
    }else if(checkInRecord.getChecks() == Checks.OUT) {
      Optional<CheckInRecord> lastCheckin = checksInRepository.findTopByEmployeeIdAndChecksOrderByTimeDesc(
          checkInRecord.getEmployee().getId(), Checks.IN);

      update(checkInRecord, employee, lastCheckin);
    }

    checkInRecord.setEmployee(employee);
    List<CheckInRecord> c = new ArrayList<>();
    c.add(checkInRecord);
    employee.setCheckInRecord(c);
    employeeRepository.save(employee);
    System.out.println("HI");
    return checksInRepository.save(checkInRecord);
  }

  private void update(CheckInRecord checkInRecord, Employee employee, Optional<CheckInRecord> lastCheckin) {
    if (lastCheckin.isPresent()) {
        CheckInRecord lastCheckInRecord = lastCheckin.get();
        long durationInMinutes = java.time.Duration.between(lastCheckInRecord.getTime(), checkInRecord.getTime()).toMinutes();

        Optional<WorkRecord> workRecordOptional = workRecordRepository
                 .findByEmployeeIdAndDate(checkInRecord.getEmployee().getId(), LocalDate.now());

        if(lastCheckInRecord.getChecks() == Checks.IN) {
          if (workRecordOptional.isPresent()) {
            WorkRecord workRecord = workRecordOptional.get();
            workRecord.setWorkTime(durationInMinutes);

            workRecord.setEmployee(employee);
            List<WorkRecord> c = new ArrayList<>();
            c.add(workRecord);
            employee.setWorkRecord(c);

            workRecordRepository.save(workRecord);
          }
        } else if (lastCheckInRecord.getChecks() == Checks.OUT) {
          if (workRecordOptional.isPresent()) {
            WorkRecord workRecord = workRecordOptional.get();
            workRecord.setOutTime(durationInMinutes);

            workRecord.setEmployee(employee);
            List<WorkRecord> c = new ArrayList<>();
            c.add(workRecord);
            employee.setWorkRecord(c);

            workRecordRepository.save(workRecord);
          }
        }

      }
  }

  public Employee createEmployee(Employee employee) {
    return employeeRepository.save(employee);
  }

  public List<Employee> getAllEmployee() {
    return employeeRepository.findAll();
  }

  public void deleteEmployeeOfId(Long id) {
    employeeRepository.deleteById(id);
  }

  public Admin createAdmin(Admin admin) {
    return adminRepository.save(admin);
  }

  public Admin verifyAdminWithCode(int code, String phone) {
    System.out.println(this.code);
    if(code == this.code) {
      System.out.println("yes");
      Admin admin = adminRepository.findByPhone(phone);
      System.out.println(admin);
      return admin;
    }
    return null;
  }

  public void sendSMSTo(String phone) {
    Random r = new Random();
    this.code = 1000 + r.nextInt(9000);
    System.out.println(this.code);

    String url = UriComponentsBuilder.fromHttpUrl("https://api.net.bd/sendsms")
        .queryParam("api_key", "bKIp7TPyAE9u0nc9bSP2hg4xGkjVOftNEK01V20j")
        .queryParam("to", phone)
        .queryParam("msg", code)
        .toUriString();

    RestTemplate restTemplate = new RestTemplate();
    restTemplate.getForEntity(url, String.class);
  }

  public Optional<Employee> getEmployeeId(Long id) {
    return employeeRepository.findById(id);
  }
}