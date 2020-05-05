import { MessageService } from './../../shared/message.service';
import { UserGuideService } from './../user-guide.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section } from '../section.model';
import { Subscription } from 'rxjs';
import { SectionFormDialogComponent } from '../section-form-dialog/section-form-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss'],
})
export class SectionsListComponent implements OnInit, OnDestroy {
  sections: Section[];

  selectedSection: Section = null;

  private userGuideSub: Subscription;

  constructor(
    private userGuideService: UserGuideService,
    private messageService: MessageService,
    private dialog: MatDialog
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
    this.setSelectedSection(section);
  }

  private setSelectedSection(section: Section): void {
    this.selectedSection = section;
    this.userGuideService.setCurrentSection(this.selectedSection);
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

  onClickEditSection(section: Section): void {
    this.openSectionFormDialog(section)
      .afterClosed()
      .subscribe((section: Section) => {
        this.setSelectedSection(section);
      });
  }

  private openSectionFormDialog(
    section?: Section
  ): MatDialogRef<SectionFormDialogComponent, Section> {
    return this.dialog.open(SectionFormDialogComponent, {
      disableClose: true,
      panelClass: 'form-dialog',
      width: '1080px',
      height: 'auto',
      data: section,
    });
  }
}
