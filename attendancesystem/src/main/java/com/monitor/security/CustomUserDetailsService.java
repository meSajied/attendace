package com.monitor.security;

import com.monitor.entity.Admin;
import com.monitor.entity.Employee;
import com.monitor.repositories.AdminRepository;
import com.monitor.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  @Autowired
  private EmployeeRepository employeeRepository;
  @Autowired
  private AdminRepository adminRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // Check if the user is an admin
    Admin admin = adminRepository.findByPhone(username).get(); // Assuming phone is unique for admin
    if (admin != null) {
      return new User(admin.getPhone(), admin.getPassword(),
          Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + admin.getRole().name())));
    }

    // Check if the user is an employee
    Employee employee = employeeRepository.findByUsername(username).get(); // Assuming username is unique for employees
    if (employee != null) {
      return new User(employee.getUsername(), employee.getPassword(),
          Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + employee.getRole().name())));
    }

    throw new UsernameNotFoundException("User not found with username: " + username);
  }
}
