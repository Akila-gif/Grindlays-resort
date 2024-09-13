package com.grindlaysresort.employeeModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.HashMap;
import java.util.List;


public interface EmployeeDao extends JpaRepository<Employee,Integer> {

        @Query(value = "select concat('EMP', lpad((SELECT SUBSTRING((SELECT max(employeeid) FROM grindlays_resort.employee ), 4))+1,4,0))", nativeQuery = true)
        String nextEmployeeID();

        // @Query(value = "select concat('CAS', lpad((SELECT SUBSTRING((SELECT max(employeeid) FROM grindlays_resort.employee where designation_id=(select d.id FROM grindlays_resort.designation as d where  d.designation_name='Cashier')), 4))+1,4,0)) AS numeric_portion;\n", nativeQuery = true)
        //String nextCashierID();

        Employee findEmployeeByNic(String nic);
        Employee findEmployeeByPassport(String passport);
        Employee findEmployeeByMobile(String mobile);
        Employee findEmployeeByEmail(String email);
        Employee findEmployeeByEmployeeid(String employeeid);

        @Query(value = "SELECT * FROM employee where id not in (SELECT employee_id FROM user);",nativeQuery = true)
        List<Employee> findEmployeeNotHaveUserAccount();

        @Query(value = "SELECT TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age FROM employee",nativeQuery = true)
        List<Integer> EmployeeAgeDataList();

/*
        @Query(value = "SELECT * FROM employee e WHERE e.citizenship=:citizenship AND e.workingstatus_id=:workingstatus_id AND e.designation_id=:designation AND category_id=:category_id AND TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) BETWEEN :min_age AND :max_age AND civil_status=:civil_status",nativeQuery = true)
        List<Employee> findEmployeeAccordingToCondition(boolean citizenship, int workingstatus_id, String designation, int category_id, int min_age, int max_age, String civil_status);
*/

        @Query(value = "SELECT COUNT(*) AS employee_count FROM employee e JOIN designation d ON e.designation_id = d.id GROUP BY d.designation_name;", nativeQuery = true)
        List findEmployeeCountAccordingtoDesignation();

        @Query(value = "SELECT d.designation_name FROM employee e JOIN designation d ON e.designation_id = d.id GROUP BY d.designation_name;", nativeQuery = true)
        List findEmployeeDesignation();

}
