import { Component, OnInit, OnDestroy } from '@angular/core';
import { KTool } from '../shared/k-tool.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { KToolsService } from '../k-tools/k-tools.service';
import { Section } from './section.model';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss'],
})
export class UserGuideComponent implements OnInit, OnDestroy {
  kTool: KTool;

  editMode = false;

  selectedSection: Section = null;

  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private kToolsService: KToolsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.kTool = this.kToolsService.findById(params.id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  onMouseoverSection(section: Section) {
    this.selectedSection = section;
  }

  onClickSectionLink(section: Section) {
    this.selectedSection = section;
  }

  onClickEditSection() {
    this.editMode = !this.editMode;
  }
}
