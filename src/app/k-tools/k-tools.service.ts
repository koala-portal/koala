import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';

export class KToolsService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Bananas', 12),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(indgredients: Ingredient[]) {
    this.ingredients.push(...indgredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
