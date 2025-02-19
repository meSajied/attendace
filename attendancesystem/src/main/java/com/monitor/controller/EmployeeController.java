package com.monitor.controller;

import com.monitor.service.EmployeeService;
import com.monitor.repositories.WorkRecordRepository;
import com.monitor.entity.Admin;
import com.monitor.entity.CheckInRecord;
import com.monitor.entity.Employee;
import com.monitor.entity.WorkRecord;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmployeeController {
  @Autowired
  Optional<Employee> employee;


  private final EmployeeService employeeService;
  private final WorkRecordRepository workRecordRepository;

  public EmployeeController(EmployeeService employeeService, WorkRecordRepository workRecordRepository) {
    this.employeeService = employeeService;
    this.workRecordRepository = workRecordRepository;
  }

  @PostMapping("/admin/register")
  public Admin registerAdmin(@RequestBody Admin admin) {
    return employeeService.createAdmin(admin);
  }

  @GetMapping("/send-sms")
  public void sendSMS( @RequestParam String phone) throws UnsupportedEncodingException {
    System.out.println(phone);
    employeeService.sendSMSTo(phone);
  }

  @GetMapping("whois")
  public String whois() {
    return "hello";
  }

  @GetMapping("/admin/login")
  public Admin  loginAdmin( @RequestParam int code, @RequestParam String phone) {
    return employeeService.verifyAdminWithCode(code, phone);
  }


  @PostMapping("/employee/login")
  public Optional<Employee> login(@RequestBody RequestAuth requestAuth) {
    return employeeService.getEmployeeOfUsernameAndPassword(requestAuth.getUsername(), requestAuth.getPassword());
  }
  @GetMapping("/employee/username/{username}")
  public Optional<Employee> getEmployee(@PathVariable String username) {
    System.out.println(username);
    return employeeService.getEmployee(username);
  }

  @GetMapping("/employee/id/{id}")
  public Optional<Employee> getEmployeeId(@PathVariable Long id) {
    return employeeService.getEmployeeId(id);
  }

  @GetMapping("/employee/get-all")
  public List<Employee> getAllEmployee() {
    return employeeService.getAllEmployee();
  }

  @PostMapping("/employee")
  public Employee addEmployee(@Valid @RequestBody Employee employee) {

    System.out.println(employee);
    return employeeService.createEmployee(employee);
  }

  @DeleteMapping("/employee/{id}")
  public void deleteEmployee(@PathVariable Long id) {
    employeeService.deleteEmployeeOfId(id);
  }

  @PutMapping("/employee/update")
  public Optional<Employee> updateEmployee(@RequestBody Employee updatedEmployee) {
    return employeeService.updateEmployee(updatedEmployee);
  }

  @GetMapping("/work-records/{id}")
  public Optional<Employee> getWorkRecords(@PathVariable Long id) {
    return employeeService.getWorkRecords(id);
  }

  @GetMapping("/work-records/{id}/month")
  public Optional<Employee> getWorkRecordsOfMonth(@PathVariable Long id, @RequestParam LocalDate date) {
    return employeeService.getWorkRecordsOfMonth(id, date);
  }

  @PostMapping("/check-in")
  public CheckInRecord checkIn(@RequestBody RequestDTO request) {
    System.out.println(request);

    employee = employeeService.getEmployee(request.getUsername());
    LocalDate localDate = request.getTime().toLocalDate();
    Optional<WorkRecord> wr = workRecordRepository.findByEmployeeIdAndDate(employee.get().getId(), localDate);
    if (wr.isEmpty()) {
      WorkRecord wrget = new WorkRecord();
      wrget.setDate(localDate);
      wrget.setEmployee(employee.get());
      wrget.setWorkTime(0);
      wrget.setOutTime(0);
      wrget.setStartTime(LocalDateTime.now());
      workRecordRepository.save(wrget);
    }

    CheckInRecord  checkInRecord = new CheckInRecord();
    checkInRecord.setEmployee(employee.get());
    checkInRecord.setChecks(request.getCheck());
    checkInRecord.setTime(request.getTime());

    return employeeService.createCheckInRecord(checkInRecord);
  }

  @GetMapping("/check-ins/{id}")
  public List<CheckInRecord> getCheckIns(@PathVariable Long id, @RequestParam LocalDate date) {
    return employeeService.getCheckInRecordByIdOfDate(id, date);
  }

  @GetMapping("/check-ins/{id}/last")
  public Optional<CheckInRecord> getLastCheckIns(@PathVariable Long id) {
    return employeeService.findLast(id);
  }

}
