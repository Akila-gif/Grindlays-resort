/*
package com.grindlaysresort.loginDetails;

import com.grindlaysresort.Role;
import com.grindlaysresort.User;
import com.grindlaysresort.UserDao;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    private UserDao userDao;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.getUserByUsername(username);
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (Role role : user.getRoleList()){
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        UserDetails userDetails =new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),user.getStatus(),true,true,true, grantedAuthorities);
        return userDetails;
    }
}
*/
