import { Component, OnInit } from '@angular/core';
import { KToolsService } from './k-tools.service';
import { Ingredient } from './../shared/ingredient.model';
@Component({
  selector: 'app-k-tools',
  templateUrl: './k-tools.component.html',
  styleUrls: ['./k-tools.component.scss'],
})
export class KToolsComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private ktService: KToolsService) {}

  ngOnInit() {
    this.ingredients = this.ktService.getIngredients();
    this.ktService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
}
