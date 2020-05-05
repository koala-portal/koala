import { SectionService } from './section.service';
import { MessageService } from './../../shared/message.service';
import { UserGuideService } from './../user-guide.service';
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
  editSection: Section = null;

  private routeParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private kToolsService: KToolsService,
    private userGuideService: UserGuideService,
    private sectionService: SectionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.route.parent.params.subscribe((params) => {
      this.sections = this.kToolsService.findById(params.id).guide.sections;
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  onMouseoverSection(section: Section): void {
    this.selectedSection = section;
    this.userGuideService.setCurrentSection(this.selectedSection);
  }

  onClickEditSection(section: Section): void {
    if (this.editSection === section) {
      this.editSection = null;
    } else {
      this.editSection = section;
    }
  }

  onSubmit(formValue: Section, section: Section): void {
    section.content = formValue.content;
    section.title = formValue.title;
    this.sectionService.put(section).subscribe(
      () => {
        this.messageService.showMessage('Section Saved');
      },
      () => {
        this.messageService.showError('Section Save Failed');
      }
    );
    this.editSection = null;
  }

  onClickDeleteSection(section: Section): void {
    this.messageService.openConfirmDialog(
      'Delete Section',
      `Are you sure you want to delete section "${section.title}"?`
    );
  }
}
