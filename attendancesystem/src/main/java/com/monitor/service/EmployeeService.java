package com.monitor.service;

import com.monitor.repositories.AdminRepository;
import com.monitor.repositories.ChecksInRepository;
import com.monitor.repositories.EmployeeRepository;
import com.monitor.repositories.WorkRecordRepository;
import com.monitor.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    Optional<Employee> employeeOptional = employeeRepository.findByUsernameAndPassword(username, password);

    if (employeeOptional.isPresent()) {
      Employee employee = employeeOptional.get();
      employee.setWorkRecord(null);
      employee.setCheckInRecord(null);
      return Optional.of(employee);
    }
    return Optional.empty();
  }

  public Optional<Employee> getEmployee(String username) {
    return employeeRepository.findByUsername(username);
  }

  public Optional<Employee> getWorkRecords(Long id) {
    Optional<Employee> employeeOptional = employeeRepository.findById(id);

    if (employeeOptional.isPresent()) {
      Employee employee = employeeOptional.get();
      employee.setCheckInRecord(null);
      return Optional.of(employee);
    }
    return Optional.empty();
  }


  public Optional<Employee> getWorkRecordsOfMonth(Long id, LocalDate date) {
    LocalDate startOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
    LocalDate endOfMonth = date.with(TemporalAdjusters.lastDayOfMonth());

    Optional<Employee> employeeOptional = employeeRepository.findEmployeeWithWorkRecordsInDateRange(id, startOfMonth, endOfMonth);

    if (employeeOptional.isPresent()) {
      Employee employee = employeeOptional.get();
      employee.setCheckInRecord(null);
      System.out.println(Optional.of(employee));
      return Optional.of(employee);
    }
    return Optional.empty();
  }

  public Optional<Employee> updateEmployee(Employee updatedEmployee) {
    Optional<Employee> existingEmployeeOpt = employeeRepository.findById(updatedEmployee.getId());

    if (existingEmployeeOpt.isPresent()) {
      Employee existingEmployee = existingEmployeeOpt.get();

      existingEmployee.setName(updatedEmployee.getName());
      existingEmployee.setEmail(updatedEmployee.getEmail());
      existingEmployee.setWorkEmail(updatedEmployee.getWorkEmail());
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
      Optional<CheckInRecord> lastCheckout = checksInRepository.findLatestCheckForEmployeeAndToday(
          Checks.OUT, LocalDate.now(), checkInRecord.getEmployee().getId());

      update(checkInRecord, employee, lastCheckout);
    }else if(checkInRecord.getChecks() == Checks.OUT) {
      Optional<CheckInRecord> lastCheckin = checksInRepository.findLatestCheckForEmployeeAndToday(
          Checks.IN, LocalDate.now(), checkInRecord.getEmployee().getId());

      update(checkInRecord, employee, lastCheckin);
    }

    checkInRecord.setEmployee(employee);
    List<CheckInRecord> c = new ArrayList<>();
    c.add(checkInRecord);
    System.out.println("HI");
    return checksInRepository.save(checkInRecord);
  }

  private void update(CheckInRecord checkInRecord, Employee employee, Optional<CheckInRecord> lastCheckin) {
    if (lastCheckin.isPresent()) {
        CheckInRecord lastCheckInRecord = lastCheckin.get();
        long durationInMinutes = java.time.Duration.between(lastCheckInRecord.getTime(), checkInRecord.getTime()).toMinutes();

        Optional<WorkRecord> workRecordOptional = workRecordRepository
                 .findByEmployeeIdAndDate(checkInRecord.getEmployee().getId(), LocalDate.now());

        if(checkInRecord.getChecks() == Checks.OUT) {
          if (workRecordOptional.isPresent()) {
            WorkRecord workRecord = workRecordOptional.get();
            workRecord.setWorkTime(durationInMinutes);
            workRecord.setEndTime(LocalDateTime.now());

            workRecord.setEmployee(employee);
            List<WorkRecord> c = new ArrayList<>();
            c.add(workRecord);
            employee.setWorkRecord(c);

            workRecordRepository.save(workRecord);
          }
        } else if (checkInRecord.getChecks() == Checks.IN) {
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

  public List<CheckInRecord> getCheckInRecordByIdOfDate(Long id, LocalDate date) {
    return checksInRepository.findByEmployeeIdAndDate(id, date);

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
      Admin admin = adminRepository.findByPhone(phone).get();
      System.out.println(admin);
      return admin;
    }
    return null;
  }

  public void sendSMSTo(String phone) throws UnsupportedEncodingException {
    Random r = new Random();
    this.code = 1000 + r.nextInt(9000);
    System.out.println(this.code);

    Optional<Admin> a = adminRepository.findByPhone(phone);

    if(a.isPresent()) {
      String message = "Your OTP is " + code;
      String encodedMessage = URLEncoder.encode(message, "UTF-8");

      String url = UriComponentsBuilder.fromHttpUrl("https://api.sms.net.bd/sendsms")
          .queryParam("api_key", "bKIp7TPyAE9u0nc9bSP2hg4xGkjVOftNEK01V20j")
          .queryParam("to", phone)
          .queryParam("msg", encodedMessage)
          .toUriString();

      RestTemplate restTemplate = new RestTemplate();
      restTemplate.getForEntity(url, String.class);
    }
  }

  public Optional<Employee> getEmployeeId(Long id) {
    return employeeRepository.findById(id);
  }

  public Optional<CheckInRecord> findLast(Long id) {
    return checksInRepository.findLastCheckForEmployeeAndToday(LocalDate.now(), id);
  }
}