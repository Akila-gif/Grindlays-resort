package com.grindlaysresort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    RoleDao roleDao;

    @GetMapping
    public List<Role> roleList(){
        return roleDao.findAll();
    }
    @GetMapping("/findroleusingid")
    public Optional<Role> getRoleById(@RequestParam("id") int roleId){
        return roleDao.findById(roleId);
    }
}
