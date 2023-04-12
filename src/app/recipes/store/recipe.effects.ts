import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { catchError, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {

  private readonly BASE_URL = 'https://ng-course-recipe-book-ebcff-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  fectchRecipes = createEffect(
    () => this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(fetchAction=> {
        return this.http.get<Recipe[]>(this.BASE_URL);
      }),
      map(recipes=>{
        return recipes.map(recipe=> {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient){}
}