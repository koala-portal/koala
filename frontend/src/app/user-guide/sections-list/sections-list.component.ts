import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section } from '../section.model';
import { KToolsService } from 'src/app/k-tools/k-tools.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss'],
})
export class SectionsListComponent implements OnInit, OnDestroy {
  sections: Section[];
  selectedSection: Section = null;

  editMode = false;

  private routeParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private kToolsService: KToolsService
  ) {}

  ngOnInit(): void {
    debugger;
    this.routeParamsSub = this.route.parent.params.subscribe((params) => {
      this.sections = this.kToolsService.findById(params.id).guide.sections;
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  onMouseoverSection(section: Section): void {
    this.selectedSection = section;
  }

  onClickEditSection(): void {
    this.editMode = !this.editMode;
  }
}
