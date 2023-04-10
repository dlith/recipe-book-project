import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from  '../store/app.reducer';
import { Store } from "@ngrx/store";
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    
    private readonly BASE_URL = 'https://ng-course-recipe-book-ebcff-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, private store: Store<fromApp.AppState>) {}

    storeRecipes(){
      const recipes = this.recipeService.getRecipes();
      this.http.put(this.BASE_URL, recipes)
      .subscribe(response=>{
        console.log(response);
      });
    }

    fetchRecipes() {
      return this.http.get<Recipe[]>(this.BASE_URL).pipe(
        map(recipes=>{
          return recipes.map(recipe=> {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }), 
        tap(recipes=> {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
    }
}