import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipe] Set recipes';
export const FETCH_RECIPES = '[Recipe] Fetch recipes';
export const ADD_RECIPE = '[Recipe] Add recipe';
export const UPDATE_RECIPE = '[Recipe] Update recipe';
export const DELETE_RECIPE = '[Recipe] Delete recipe';
export const STORE_RECIPES = '[Recipe] Store recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;

}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, newRecipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesActions = 
| SetRecipes 
| FetchRecipes 
| AddRecipe 
| UpdateRecipe 
| DeleteRecipe
| StoreRecipes;