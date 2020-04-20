import { KToolsService } from './../k-tools.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KTool } from '../../shared/k-tool.model';

@Component({
  selector: 'app-k-tool-edit',
  templateUrl: './k-tool-edit.component.html',
  styleUrls: ['./k-tool-edit.component.scss'],
})
export class KToolEditComponent implements OnInit {
  constructor(private ktService: KToolsService) {}

  ngOnInit(): void {}

  onAddItem(form: NgForm) {
    const value = form.value;
    const newTool = new KTool(value.name, value.amount);

    this.ktService.addkTool(newTool);
  }
}
