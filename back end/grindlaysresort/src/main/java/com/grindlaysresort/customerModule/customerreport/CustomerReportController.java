package com.grindlaysresort.customerModule.customerreport;

import com.grindlaysresort.customerModule.Customer;
import com.grindlaysresort.customerModule.CustomerDao;
import com.grindlaysresort.customerModule.CustomerStatusDao;
import com.grindlaysresort.employeeModule.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("report/customerreport")
public class CustomerReportController {

    @Autowired
    CustomerDao customerDao;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/customercountbycountry")
    public List customerCountAccordingToCountry (){
        return customerDao.findCountByCountry();
    }

    @GetMapping("/customercountrylist")
    public List customerCountryList (){
        return customerDao.findByCountryAvailableList();
    }

    @GetMapping("/customercountryandcountlist")
    public List<Object> getByCountryandcountAvailableList (){

        List<Object> customerlist = new ArrayList<>();
        for (Object element: customerDao.findByCountryandcountAvailableList()){
            Object[] obj = (Object[]) element;
            HashMap<String,Object> countrycountmap = new HashMap<>();
            countrycountmap.put("country",obj[0].toString());
            countrycountmap.put("count",Integer.parseInt(obj[1].toString()));
            customerlist.add(countrycountmap);
        }
        return customerlist;
    }

    @GetMapping("/customerlist")
    public List<Employee> findCustomerByDynamicCriteria(@RequestParam(required = false)Boolean citizenship, @RequestParam(required = false) Integer customerstatus_id, @RequestParam(required = false)Integer country_id, @RequestParam(required = false) Integer min_age, @RequestParam(required = false) Integer max_age, @RequestParam(required = false) String civil_status) {
        // Start building the query string
        StringBuilder queryString = new StringBuilder("SELECT * FROM customer c");

        // Track whether the "WHERE" clause has been added
        boolean whereAdded = false;

        // Add conditions dynamically based on non-null parameters
        if (citizenship != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" c.citizenship = :citizenship");
            whereAdded = true;
        }
        if (customerstatus_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" c.customerstatus_id = :customerstatus_id");
            whereAdded = true;
        }
        if (country_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" c.country_id = :country_id");
            whereAdded = true;
        }
        if (min_age != null && max_age != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" TIMESTAMPDIFF(YEAR, c.date_of_birth, CURDATE()) BETWEEN :min_age AND :max_age");
            whereAdded = true;
        }
        if (civil_status != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" c.civil_status = :civil_status");
        }

        queryString.append(" ORDER BY c.id desc");
        // Create the query
        Query query = entityManager.createNativeQuery(queryString.toString(), Customer.class);

        // Set parameters if they are not null
        if (citizenship != null) {
            query.setParameter("citizenship", citizenship);
        }
        if (customerstatus_id != null) {
            query.setParameter("customerstatus_id", customerstatus_id);
        }
        if (country_id != null) {
            query.setParameter("country_id", country_id);
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

        return query.getResultList();
    }

    @GetMapping("/agelist")
    public List<Integer> CustomerAgeDataList(){
        return customerDao.CustomerAgeDataList();
    }

}
