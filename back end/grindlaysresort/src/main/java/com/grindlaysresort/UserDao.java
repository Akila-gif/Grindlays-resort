package com.grindlaysresort;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;


@EnableJpaRepositories
public interface UserDao extends JpaRepository<User, Integer> {
    User getUserByUsername(String username);


/*
    @Query("SELECT new User(u.id, u.username, u.addeddate, u.updatedate, u.deletedate,u.employee_id, u.status) FROM User u")
    List<User> userListss();
*/

}
