package com.grindlaysresort.menu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemDao extends JpaRepository<MenuItem, Integer> {
    // Additional query methods can be defined here if needed
}
