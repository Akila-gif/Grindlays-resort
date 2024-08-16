package com.grindlaysresort.roomModule.feature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/feature")
public class FeatureController {

    @Autowired
    FeatureDao featureDao;

    @GetMapping
    public List<Features> getAllFeatures(){
        return featureDao.findAll();
    }

    @GetMapping(value = "/{id}")
    public Features getFeatureById(@PathVariable int id){
        Optional<Features> feature = featureDao.findById(id);
        return feature.orElse(null);

    }
}
