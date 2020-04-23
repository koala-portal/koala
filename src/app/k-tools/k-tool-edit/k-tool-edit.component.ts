import { KToolsService } from './../k-tools.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KTool } from '../../shared/k-tool.model';

@Component({
  selector: 'app-k-tool-edit',
  templateUrl: './k-tool-edit.component.html',
  styleUrls: ['./k-tool-edit.component.scss'],
})
export class KToolEditComponent {
  constructor(private kToolsService: KToolsService) {}

  onAddItem(form: NgForm) {
    this.kToolsService.addkTool(form.value);
  }
}
