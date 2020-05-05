import { MessageService } from './../../shared/message.service';
import { UserGuideService } from './../user-guide.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section } from '../section.model';
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

  private userGuideSub: Subscription;

  constructor(
    private userGuideService: UserGuideService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userGuideSub = this.userGuideService.userGuide$.subscribe(
      (userGuide) => {
        this.sections = userGuide.sections;
      }
    );
  }

  ngOnDestroy(): void {
    this.userGuideSub.unsubscribe();
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
    this.userGuideService.putSection(section).subscribe(
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
    this.messageService
      .openConfirmDialog(
        'Delete Section',
        `Are you sure you want to delete section "${section.title}"?`
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.userGuideService
            .deleteSection(section)
            .subscribe((userGuide) => {
              this.userGuideService.setUserGuide(userGuide);
            });
        }
      });
  }
}
