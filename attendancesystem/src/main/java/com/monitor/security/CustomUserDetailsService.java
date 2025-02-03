package com.monitor.security;

import com.monitor.entity.Admin;
import com.monitor.entity.Employee;
import com.monitor.repositories.AdminRepository;
import com.monitor.repositories.EmployeeRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  private final EmployeeRepository employeeRepository;
  private final AdminRepository adminRepository;

  public CustomUserDetailsService(EmployeeRepository employeeRepository,
      AdminRepository adminRepository) {
    this.employeeRepository = employeeRepository;
    this.adminRepository = adminRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<Employee> employeeOp = employeeRepository.findByUsername(username);
    Optional<Admin> adminOp = adminRepository.findByUsername(username);

    if (employeeOp.isPresent()) {
      Employee employee = employeeOp.get();

      return User.builder()
          .username(employee.getUsername())
          .password(employee.getPassword())
          .roles(employee.getRole().name())
          .build();
    }

    if (adminOp.isPresent()) {
      Admin admin = adminOp.get();

      return User.builder()
          .username(admin.getUsername())
          .password(admin.getPassword())
          .roles(admin.getRole().name())
          .build();
    }

    throw new UsernameNotFoundException("User not found with username: " + username);
  }
}