package com.grindlaysresort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/privilege")
public class PrivilageController {

    @Autowired
    PrivilageDao privilageDao;

    @GetMapping
    public List<Privilage> getAllPrivilage(){
        return privilageDao.findAll();
    }
}
