import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    
    private readonly BASE_URL = 'https://ng-course-recipe-book-ebcff-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.BASE_URL, recipes)
        .subscribe(response=>{
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.BASE_URL)
        .pipe(map(recipes=>{
            return recipes.map(recipe=> {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }), 
        tap(recipes=> {
            this.recipeService.setRecipes(recipes);
        })
        );
    }
}