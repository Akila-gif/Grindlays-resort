package com.grindlaysresort.menu.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/ingredients")
public class IngredientsController {

    @Autowired
    IngredientsDao ingredientsDao;

    @GetMapping
    public Iterable<Ingredient> getAllIngredients(){
        return ingredientsDao.findAll();
    }
    @GetMapping("/{id}")
    public Ingredient getIngredientById(@PathVariable int id) {

        Optional<Ingredient> optionalIngredient = ingredientsDao.findById(id);

        Ingredient ingredient = optionalIngredient.get();

        System.out.println("Ingredient Name: " + ingredient.getName());
        System.out.println("Ingredient code: " + ingredient.getIngredientscode());
        System.out.println("Ingredient QuentityStatus : " + ingredient.getIngredientsstatus_id().getQuentityStatus());
        System.out.println("Ingredient Food category : " + ingredient.getFoodcategory_id().getType());
        return ingredient;
    }
}
