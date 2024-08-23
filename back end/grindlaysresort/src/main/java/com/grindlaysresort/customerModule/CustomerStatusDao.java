package com.grindlaysresort.customerModule;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerStatusDao extends JpaRepository<CustomerStatus,Integer> {
}
