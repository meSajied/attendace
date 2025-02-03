package com.monitor.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.PasswordManagementConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;
@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {
  private final CustomUserDetailsService customUserDetailsService;

  public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
    this.customUserDetailsService = customUserDetailsService;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(c -> c.disable());

    http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

    // Configure request matchers for each endpoint
    http.authorizeHttpRequests(a -> {
          a
              // Public endpoints
              .requestMatchers(HttpMethod.GET, "/whois").permitAll()
              .requestMatchers(HttpMethod.GET, "/admin/login").permitAll()
              .requestMatchers(HttpMethod.POST, "/admin/register").permitAll()
              .requestMatchers(HttpMethod.GET, "/send-sms").permitAll()
              .requestMatchers(HttpMethod.POST, "/employee/login").permitAll()

              // Protected endpoints
              .requestMatchers(HttpMethod.GET, "/employee/username/{username}").authenticated()
              .requestMatchers(HttpMethod.GET, "/employee/id/{id}").authenticated()
              .requestMatchers(HttpMethod.GET, "/employee/get-all").hasRole("ADMIN")
              .requestMatchers(HttpMethod.POST, "/employee").hasRole("ADMIN")
              .requestMatchers(HttpMethod.DELETE, "/employee/{id}").hasRole("ADMIN")
              .requestMatchers(HttpMethod.PUT, "/employee/update").hasAnyRole("ADMIN", "EMPLOYEE")

              .requestMatchers(HttpMethod.GET, "/work-records/{id}").hasAnyRole("ADMIN", "EMPLOYEE")
              .requestMatchers(HttpMethod.GET, "/work-records/{id}/month").hasAnyRole("ADMIN", "EMPLOYEE")

              .requestMatchers(HttpMethod.POST, "/check-in").hasRole("EMPLOYEE")
              .requestMatchers(HttpMethod.GET, "/check-ins/{id}").hasAnyRole("ADMIN", "EMPLOYEE")
              .requestMatchers(HttpMethod.GET, "/check-ins/{id}/last").hasRole("EMPLOYEE");
        })
        .userDetailsService(userDetailsService())
        .httpBasic(Customizer.withDefaults());

    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("*"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
    return http.getSharedObject(AuthenticationManagerBuilder.class).build();
  }

  @Bean
  public UserDetailsService userDetailsService() {
    return customUserDetailsService;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
  }
}
