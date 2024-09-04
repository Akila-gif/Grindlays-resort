package com.grindlaysresort.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceDao extends JpaRepository<Service, Integer> {

    @Query(nativeQuery = false , value = "SELECT s FROM Service s WHERE s.servicecategory_id.id = :id")
    List<Service> findByServicecategory_id(int id);
}
