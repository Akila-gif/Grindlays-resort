package com.grindlaysresort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/module")
public class ModuleController {

    @Autowired
    ModuleDao moduleDao;

    @GetMapping
    public List<Module> getAllModule(){
        return moduleDao.findAll();
    }
}
