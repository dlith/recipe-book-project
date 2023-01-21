import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {

    private recipes: Recipe[]  = [
        new Recipe('Tasty Schnitzel', 
                'A super-tasty Schnitzel - just awesome!', 
                'https://insanelygoodrecipes.com/wp-content/uploads/2022/03/Homemade-Pork-Schnitzel-with-Cauliflower-and-Lemons.jpg',
                [new Ingredient('Meat', 1), new Ingredient('Grench Fries', 20)]
                ),
        new Recipe('Big Fat Burger', 
            'What else you need to say?', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBXg9Y0Q8bLvmuTmuveq7ie92J6cw25UPgQ&usqp=CAU',
            [new Ingredient('Buns', 2), new Ingredient('Meat', 20)]
            ),
        new Recipe('Greece Salad ', 
            'This is best salad!', 
            'https://www.mygreekdish.com/wp-content/uploads/2013/05/Traditional-Greek-Salad-recipe-Horiatiki-Xoriatiki-1-scaled.jpg',
            [new Ingredient('Salad', 2), new Ingredient('Feta', 20)]
            )
      ];

    recipeSelected = new EventEmitter<Recipe>();
      
    getRecipes() {
        return this.recipes.slice();
    }
}