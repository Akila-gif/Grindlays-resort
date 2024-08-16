package com.grindlaysresort.roomModule.bedtype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/bedtypes")
public class BedTypeController {

        @Autowired
        private BedTypeDao bedTypeDao;

        @GetMapping
        public List<BedType> getAllBedType(){
            return bedTypeDao.findAll();
        }
}
