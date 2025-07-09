package com.grindlaysresort.menu.ingredient;

import com.grindlaysresort.menu.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface MenuDao extends JpaRepository<Menu, Integer> {
}
