package com.grindlaysresort;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.annotation.RestResource;

public interface CountryDao extends JpaRepository<Country, Integer> {

    @Query
    Country findCountryByCountryCode(String countryCode);
}
