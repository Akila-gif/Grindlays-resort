package com.grindlaysresort.customerModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customerStatus")
public class CustomerStatusController {

    @Autowired
    CustomerStatusDao customerStatusDao;

    @GetMapping
    public List<CustomerStatus> getAllStatus(){
        return customerStatusDao.findAll();
    }
}
