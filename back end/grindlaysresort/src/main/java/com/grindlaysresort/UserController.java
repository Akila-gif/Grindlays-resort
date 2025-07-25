package com.grindlaysresort;

import com.grindlaysresort.exception.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("user")
public class UserController {

    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping
    public List<User> getAllUser(){
       return userDao.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById (@PathVariable("id") int id){
        return userDao.findById(id);
    }

/*
    @GetMapping("/withoutpassword")
    public List<User> getAllUsersWithoutPassword() {
        List<User> userList = userDao.findAll();
        List<User> userListWithoutPassword = new ArrayList<>();
        for (User user : userList){
            user.setPassword(null);
            userListWithoutPassword.add(user);
        }

        return userListWithoutPassword;
    }
*/

    // Uda thiyena eka use karannath puluwan
    @GetMapping("/withoutpassword")
    public List<User> getAllUsersWithoutPassword(){
        List<User> userList = userDao.findAll();
        List<User> userListWithoutPassword = new ArrayList<>();
        userListWithoutPassword = userList.stream().map(user -> {
            user.setPassword(null);
            return user;
        }).collect(Collectors.toList());
        return userListWithoutPassword;
    }

    @PostMapping
    public User addNewUser(@RequestBody User user){
        user.setAddeddate(LocalDateTime.now());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        List<Role> managedRoles = new ArrayList<>();
        for (Role role : user.getRoleList()) {
            Role managedRole = roleDao.findById(role.getId())
                    .orElseThrow(() -> new RuntimeException("Role not found: " + role.getId()));
            managedRoles.add(managedRole);
        }
        user.setRoleList(managedRoles);
        return userDao.save(user);
    }

/*    @GetMapping("/withoutpassword")
    public List<User> getAllUsersWithoutPassword() {
        return userDao.userListss();
    }*/

    @DeleteMapping()
    public void deleteUserAccount(@RequestParam("id") int id){
        Optional<User> userOptional = userDao.findById(id);
        if (userOptional.isEmpty()){
            HashMap<String,String> errorSet  = new HashMap<>();
            errorSet.put("error","Ther User Account not found");
            throw new ObjectNotFoundException(errorSet);
        }else {
            User user = userOptional.get();
            user.setStatus(false);
            userDao.save(user);
        }
    }
}