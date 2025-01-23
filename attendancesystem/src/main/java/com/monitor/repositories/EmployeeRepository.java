package com.monitor.repositories;

import com.monitor.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

  Optional<Employee> findByUsernameAndPassword(String username, String password);
  Optional<Employee> findByUsername(String username);

  @Query("SELECT e FROM Employee e " +
      "JOIN FETCH e.workRecord wr " +
      "WHERE e.id = :employeeId " +
      "AND wr.date BETWEEN :startDate AND :endDate")
  Optional<Employee> findEmployeeWithWorkRecordsInDateRange(Long employeeId, LocalDate startDate, LocalDate endDate);
}
