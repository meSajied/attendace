package com.monitor.repositories;

import com.monitor.entity.WorkRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRecordRepository extends JpaRepository<WorkRecord, Long> {

  List<WorkRecord> findByDate(LocalDate date);

  Optional<WorkRecord> findByEmployeeIdAndDate(long employeeId, LocalDate date);

  List<WorkRecord> findByEmployeeId(Long employeeId);

  List<WorkRecord> findByEmployeeIdAndDateBetween(Long employeeId, LocalDate start, LocalDate end);
}
