package com.grindlaysresort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(name = "/categories")
public class CategoryController {

    @Autowired
    private CategoryDao categoryDao;

    @GetMapping
    public List<Category> getAll(){
        return categoryDao.findAll();
    }
}
