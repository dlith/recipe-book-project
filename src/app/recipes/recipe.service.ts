import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
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
            'This is the best salad!', 
            'https://www.mygreekdish.com/wp-content/uploads/2013/05/Traditional-Greek-Salad-recipe-Horiatiki-Xoriatiki-1-scaled.jpg',
            [new Ingredient('Salad', 2), new Ingredient('Feta', 20)]
            )
      ];

      
    constructor(private shoppinngListService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppinngListService.addIngredients(ingredients);
    }
}