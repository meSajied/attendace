package com.monitor.repositories;

import com.monitor.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

  Optional<Employee> findByUsernameAndPassword(String username, String password);
  Optional<Employee> findByUsername(String username);
}
