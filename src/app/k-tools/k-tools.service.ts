import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

export class KToolsService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Bananas', 12),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    console.log('added');
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(indgredients: Ingredient[]) {
    // for (let ingredeint of this.ingredients) {
    //   this.addIngredient(ingredeint);
    // }

    this.ingredients.push(...indgredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
