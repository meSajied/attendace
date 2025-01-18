package com.monitor.repositories;

import com.monitor.entity.CheckInRecord;
import com.monitor.entity.Checks;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChecksInRepository extends CrudRepository<CheckInRecord, Long> {
  List<CheckInRecord> findByEmployeeId(Long employeeId);

  Optional<CheckInRecord> findTopByEmployeeIdAndChecksOrderByTimeDesc(Long employeeId, Checks checks);
}
