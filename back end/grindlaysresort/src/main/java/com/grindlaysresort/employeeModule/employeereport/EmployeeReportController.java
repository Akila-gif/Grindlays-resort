package com.grindlaysresort.employeeModule.employeereport;

import com.grindlaysresort.employeeModule.Employee;
import com.grindlaysresort.employeeModule.EmployeeDao;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("report/employeereport")
public class EmployeeReportController {

    @Autowired
    EmployeeDao employeeDao;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/agelist")
    public List<Integer> EmployeeAgeDataList(){
        return employeeDao.EmployeeAgeDataList();
    }

    @GetMapping("/employeelist")
    public List<Employee> findEmployeesByDynamicCriteria(@RequestParam(required = false) Boolean citizenship,@RequestParam(required = false) Integer workingstatus_id,@RequestParam(required = false) Integer designation,@RequestParam(required = false) Integer category_id,@RequestParam(required = false) Integer min_age,@RequestParam(required = false) Integer max_age,@RequestParam(required = false) String civil_status) {
        // Start building the query string
        StringBuilder queryString = new StringBuilder("SELECT * FROM employee e");

        // Track whether the "WHERE" clause has been added
        boolean whereAdded = false;

        // Add conditions dynamically based on non-null parameters
        if (citizenship != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" e.citizenship = :citizenship");
            whereAdded = true;
        }
        if (workingstatus_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" e.workingstatus_id = :workingstatus_id");
            whereAdded = true;
        }
        if (designation != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" e.designation_id = :designation");
            whereAdded = true;
        }
        if (category_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" e.category_id = :category_id");
            whereAdded = true;
        }
        if (min_age != null && max_age != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" TIMESTAMPDIFF(YEAR, e.date_of_birth, CURDATE()) BETWEEN :min_age AND :max_age");
            whereAdded = true;
        }
        if (civil_status != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" e.civil_status = :civil_status");
        }

        queryString.append(" ORDER BY e.id desc");

        // Create the query
        Query query = entityManager.createNativeQuery(queryString.toString(), Employee.class);

        // Set parameters if they are not null
        if (citizenship != null) {
            query.setParameter("citizenship", citizenship);
        }
        if (workingstatus_id != null) {
            query.setParameter("workingstatus_id", workingstatus_id);
        }
        if (designation != null) {
            query.setParameter("designation", designation);
        }
        if (category_id != null) {
            query.setParameter("category_id", category_id);
        }
        if (min_age != null) {
            query.setParameter("min_age", min_age);
        }
        if (max_age != null) {
            query.setParameter("max_age", max_age);
        }
        if (civil_status != null) {
            query.setParameter("civil_status", civil_status);
        }

        // Execute the query and return results
        return query.getResultList();
    }


/*    @GetMapping("/dynamic-query")
    public List<Employee> getEmployees(
            @RequestParam(value = "citizenship", required = false) Boolean citizenship,
            @RequestParam(value = "workingstatus_id", required = false) Integer workingstatus_id,
            @RequestParam(value = "designation", required = false) Integer designation,
            @RequestParam(value = "category_id", required = false) Integer category_id,
            @RequestParam(value = "min_age", required = false) Integer min_age,
            @RequestParam(value = "max_age", required = false) Integer max_age,
            @RequestParam(value = "civil_status", required = false) String civil_status) {
        return this.findEmployeesByDynamicCriteria(citizenship, workingstatus_id, designation, category_id, min_age, max_age, civil_status);
    }*/

    @GetMapping("/getemployeecount")
    public List getEmployeeCountAccordingtoDesignation(){
        return employeeDao.findEmployeeCountAccordingtoDesignation();
    }

    @GetMapping("/getemployeeDesignationlist")
    public List getEmployeeDesignationList(){
        return employeeDao.findEmployeeDesignation();
    }

}
