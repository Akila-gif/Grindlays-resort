package com.grindlaysresort;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeestatusDao extends JpaRepository<WorkingStatus,Integer> {
}
