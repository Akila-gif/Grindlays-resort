package com.grindlaysresort.menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface MenuDao extends JpaRepository<Menu, Integer> {
}
