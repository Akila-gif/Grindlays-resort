package com.grindlaysresort.customerModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDao extends JpaRepository<Customer,Integer> {

    @Query(value = "select concat('CUS', (SELECT SUBSTRING((SELECT max(customernumber) FROM grindlays_resort.customer ), 4))+1);", nativeQuery = true)
    String nextCustomerNumber();

    Customer findCustomerByNic(String nic);

    Customer findCustomerByPassport(String passport);

    Customer findCustomerByMobile(String mobile);

    Customer findCustomerByEmail(String email);

}
