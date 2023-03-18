import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ADD_INGREDIENT } from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT: 
      return {
        ...state,
        ingredient: [...state.ingredients, action]
      };
  }
}