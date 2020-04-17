import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KToolsService } from './k-tools.service';
import { Ingredient } from './../shared/ingredient.model';
@Component({
  selector: 'app-k-tools',
  templateUrl: './k-tools.component.html',
  styleUrls: ['./k-tools.component.scss'],
})
export class KToolsComponent implements OnInit {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private ktService: KToolsService) {}

  ngOnInit() {
    this.ingredients = this.ktService.getIngredients();
    this.igChangeSub = this.ktService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
