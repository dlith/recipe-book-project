import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions"
import * as fromApp from '../store/app.reducer';


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>;

    // private recipes: Recipe[]  = [
    //     new Recipe('Tasty Schnitzel', 
    //         'A super-tasty Schnitzel - just awesome!', 
    //         'https://insanelygoodrecipes.com/wp-content/uploads/2022/03/Homemade-Pork-Schnitzel-with-Cauliflower-and-Lemons.jpg',
    //         [new Ingredient('Meat', 1), new Ingredient('Grench Fries', 20)]
    //         ),
    //     new Recipe('Big Fat Burger', 
    //         'What else you need to say?', 
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBXg9Y0Q8bLvmuTmuveq7ie92J6cw25UPgQ&usqp=CAU',
    //         [new Ingredient('Buns', 2), new Ingredient('Meat', 20)]
    //         ),
    //     new Recipe('Greece Salad ', 
    //         'This is the best salad!', 
    //         'https://www.mygreekdish.com/wp-content/uploads/2013/05/Traditional-Greek-Salad-recipe-Horiatiki-Xoriatiki-1-scaled.jpg',
    //         [new Ingredient('Salad', 2), new Ingredient('Feta', 20)]
    //         )
    //   ];
    private recipes: Recipe[] = [];
      
    constructor(private store: Store<fromApp.AppState>){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        // this.shoppinngListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}