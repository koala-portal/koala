import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KToolsService } from './k-tools.service';
import { KTool } from '../shared/k-tool.model';
@Component({
  selector: 'app-k-tools',
  templateUrl: './k-tools.component.html',
  styleUrls: ['./k-tools.component.scss'],
})
export class KToolsComponent implements OnInit {
  kTools: KTool[];
  private igChangeSub: Subscription;

  constructor(private ktService: KToolsService) {}

  ngOnInit() {
    this.kTools = this.ktService.getkTools();
    this.igChangeSub = this.ktService.kToolsChanged.subscribe(
      (kTools: KTool[]) => {
        this.kTools = kTools;
      }
    );
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
