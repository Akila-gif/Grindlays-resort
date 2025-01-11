package com.grindlaysresort.customerModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface CustomerDao extends JpaRepository<Customer,Integer> {

    @Query(value = "select concat('CUS', (SELECT SUBSTRING((SELECT max(customernumber) FROM grindlays_resort.customer ), 4))+1);", nativeQuery = true)
    String nextCustomerNumber();

    Customer findCustomerByNic(String nic);

    Customer findCustomerByPassport(String passport);

    Customer findCustomerByMobile(String mobile);

    Customer findCustomerByEmail(String email);

    @Query(value = "select count(*) from customer cu join country co on cu.country_id = co.id group by co.country_name;", nativeQuery = true)
    List findCountByCountry();

    @Query(value = "select co.country_name from customer cu join country co on cu.country_id = co.id group by co.country_name;", nativeQuery = true)
    List findByCountryAvailableList();

    @Query(value = "select co.country_name ,count(*)from customer cu join country co on cu.country_id = co.id group by co.country_name;", nativeQuery = true)
    List findByCountryandcountAvailableList();

    @Query(value = "SELECT TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age FROM customer",nativeQuery = true)
    List<Integer> CustomerAgeDataList();

    @Query(value = "SELECT new Customer(cu.id, cu.nic,cu.mobile,cu.full_name,cu.passport,cu.customernumber) FROM Customer cu")
    ArrayList<Object> findAllMobileNicPassportAndName();

}
