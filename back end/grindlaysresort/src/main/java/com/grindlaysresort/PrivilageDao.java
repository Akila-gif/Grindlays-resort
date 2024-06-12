package com.grindlaysresort;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PrivilageDao extends JpaRepository<Privilage,Integer> {
    @Query(nativeQuery = true , value = "SELECT bit_or( p.insert) as 'insert', bit_or(p.select) as 'select', bit_or(p.delete) as 'delete', bit_or(p.update) as 'update'  FROM grindlays_resort.privilage as p where p.role_id " +
            "in (SELECT ur.role_id FROM grindlays_resort.user_has_role ur where ur.user_id in (SELECT u.id FROM grindlays_resort.user u where u.username=:user) ) " +
            "and p.module_id in  (select m.id from grindlays_resort.module m where m.name=:module);")
    String getPrivilageByUserAndModule(@Param("module") String moduleName ,@Param("user") String userName);
}
