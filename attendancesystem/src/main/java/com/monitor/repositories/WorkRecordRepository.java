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
  //Optional<WorkRecord> findByDate(LocalDate date);
  Optional<WorkRecord> findByEmployeeIdAndDate(Long employeeId, LocalDate date);
  @Query("SELECT w FROM WorkRecord w JOIN FETCH w.employee")
  List<WorkRecord> findAllWithEmployeeData();

  List<WorkRecord> findByDateBetween(LocalDate start, LocalDate end);
}
