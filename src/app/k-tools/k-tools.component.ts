import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-k-tools',
  templateUrl: './k-tools.component.html',
  styleUrls: ['./k-tools.component.scss']
})
export class KToolsComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 3),
    new Ingredient("Bananas", 12),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
