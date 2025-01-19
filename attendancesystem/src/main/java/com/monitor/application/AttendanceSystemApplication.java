package com.monitor.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.monitor"})
@EnableJpaRepositories(basePackages = "com.monitor.repositories")
@EntityScan(basePackages = "com.monitor.entity")
public class AttendanceSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(AttendanceSystemApplication.class, args);
	}
}
