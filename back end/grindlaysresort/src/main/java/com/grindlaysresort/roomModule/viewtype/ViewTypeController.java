package com.grindlaysresort.roomModule.viewtype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/viewtypes")
public class ViewTypeController {

    @Autowired
    private ViewTypeDao viewTypeDao;

    @GetMapping
    public List<ViewType> getAllViewType(){
        return viewTypeDao.findAll();
    }
}
