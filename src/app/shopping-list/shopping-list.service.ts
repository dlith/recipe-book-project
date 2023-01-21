import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];


    addIngredient(ingregient: Ingredient){
        this.ingredients.push(ingregient);
    }

    getIngredients(){
        return this.ingredients.slice();
    }
}