package com.grindlaysresort.menu.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ingradientfoodcategory")
public class FoodCategoryController {
    @Autowired
    private FoodCategoryDao foodCategoryDao;

    @GetMapping
    public List<FoodCategory> getAllFoodCategories() {
        return foodCategoryDao.findAll();
    }
}
