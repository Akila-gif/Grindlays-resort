package com.grindlaysresort.employeeModule.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("categories")
public class EmployeeCategoryController {

    @Autowired
    private EmployeeCategoryDaoDao employeeCategoryDaoDao;

    @GetMapping
    public List<EmployeeCategory> getAll(){
        return employeeCategoryDaoDao.findAll();
    }
}
