package com.grindlaysresort.employeeModule;

import com.grindlaysresort.WorkingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeestatusDao extends JpaRepository<WorkingStatus,Integer> {
}
