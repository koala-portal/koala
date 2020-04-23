import { Component, OnInit } from '@angular/core';
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

  // Pagination
  pageSizeOptions = [12, 24, 48, 96];
  pageSize = this.pageSizeOptions[0];

  // Filters
  onlyStarred = false;
  filterText = '';
  sortBy = 'numUsers';
  direction = 'asc';

  private kToolsSub: Subscription;

  constructor(private kToolsService: KToolsService) {}

  ngOnInit(): void {
    this.kTools = this.kToolsService.getkTools();
    this.kToolsSub = this.kToolsService.kToolsChanged.subscribe((kTools) => {
      this.kTools = kTools;
    });
  }

  getFilteredKTools(): KTool[] {
    const filteredKTools = this.kTools.filter((kTool) => {
      return (
        (!this.onlyStarred || kTool.starred) &&
        (!this.filterText ||
          kTool.name.toLowerCase().includes(this.filterText.toLowerCase()))
      );
    });

    const gt = this.direction === 'asc' ? 1 : -1;
    return filteredKTools.sort((a, b) =>
      a[this.sortBy] > b[this.sortBy]
        ? gt
        : a[this.sortBy] === b[this.sortBy]
        ? a.id > b.id
          ? gt
          : -gt
        : -gt
    );
  }

  ngOnDestroy(): void {
    this.kToolsSub.unsubscribe();
  }

  onClickAddTool(): void {
    alert('TODO: onClickAddTools');
  }
}
