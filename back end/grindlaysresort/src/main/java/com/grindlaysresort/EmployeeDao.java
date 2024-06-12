package com.grindlaysresort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
}
