import { Component, OnInit, Input } from '@angular/core';
import { KTool } from 'src/app/shared/k-tool.model';

@Component({
  selector: 'app-k-tool-card',
  templateUrl: './k-tool-card.component.html',
  styleUrls: ['./k-tool-card.component.scss'],
})
export class KToolCardComponent implements OnInit {
  @Input() kTool: KTool;

  constructor() {}

  ngOnInit(): void {}

  onClickStarTool(): void {
    alert('TODO: onClickStarTool');
  }

  onClickEditTool(): void {
    alert('TODO: onClickEditTool');
  }

  onClickDeleteTool(): void {
    alert('TODO: onClickDeleteTool');
  }
}
