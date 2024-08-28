package com.grindlaysresort.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ServiceDao extends JpaRepository<Service,Integer> {
}
