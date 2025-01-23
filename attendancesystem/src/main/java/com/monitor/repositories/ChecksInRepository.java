package com.monitor.repositories;

import com.monitor.entity.CheckInRecord;
import com.monitor.entity.Checks;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChecksInRepository extends CrudRepository<CheckInRecord, Long> {
  //List<CheckInRecord> findByEmployeeId(Long employeeId);

  @Query("SELECT c FROM CheckInRecord c WHERE FUNCTION('DATE', c.time) = :date AND c.employee.id = :employeeId")
  List<CheckInRecord> findByEmployeeIdAndDate(Long employeeId, LocalDate date);

  @Query("SELECT c FROM CheckInRecord c WHERE FUNCTION('DATE', c.time) = :today AND c.checks = :check AND c.employee.id = :employeeId ORDER BY c.time DESC")
  Optional<CheckInRecord> findLatestCheckForEmployeeAndToday(Checks check, LocalDate today, Long employeeId);

}
