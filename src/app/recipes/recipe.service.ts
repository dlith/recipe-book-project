import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {

    private recipes: Recipe[]  = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-1-1200.jpg'),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-1-1200.jpg'),
        new Recipe('Last one Test Recipe', 'This is simply a test', 'https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-1-1200.jpg')
      ];

    recipeSelected = new EventEmitter<Recipe>();
      
    getRecipes() {
        return this.recipes.slice();
    }
}