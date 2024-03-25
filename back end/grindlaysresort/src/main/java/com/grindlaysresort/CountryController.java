package com.grindlaysresort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/country")
public class CountryController {

    @Autowired
    private CountryDao countryDao;

    @GetMapping
    public List<Country> getAllCountry() {
        return countryDao.findAll();
    }

    @GetMapping("/{countryCode}")
    public Country findCountryByCountryCode(@PathVariable String countryCode) {
        return countryDao.findCountryByCountryCode(countryCode);
    }
    @PostMapping
    public Country findCountryByCountryCode(@RequestBody Country country) {
        return countryDao.save(country);
    }
}
