import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ReleaseNotesFormDialogComponent } from 'src/app/release-notes/release-notes-form-dialog/release-notes-form-dialog.component';
import { ReleaseNotes } from 'src/app/release-notes/release-notes.model';
import { KTool } from 'src/app/shared/k-tool.model';
import { SectionFormDialogComponent } from './section-form-dialog/section-form-dialog.component';
import { Section } from './section.model';
import { UserGuide } from './user-guide.model';
import { UserGuideService } from './user-guide.service';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss'],
})
export class UserGuideComponent implements OnInit, OnDestroy {
  kTool: KTool;
  userGuide: UserGuide;

  selectedSection: Section = null;

  private sectionSub: Subscription;
  private userGuideSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userGuideService: UserGuideService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.kTool = this.route.snapshot.data.kTool;
    this.userGuideSub = this.userGuideService.userGuide$.subscribe(
      (userGuide) => {
        this.userGuide = userGuide;
      }
    );
    this.sectionSub = this.userGuideService.currentSection$.subscribe(
      (section) => {
        this.selectedSection = section;
      }
    );
  }

  ngOnDestroy(): void {
    this.sectionSub.unsubscribe();
    this.userGuideSub.unsubscribe();
  }

  onClickSectionLink(section: Section): void {
    this.userGuideService.setCurrentSection(section);
    this.scrollToSection(section);
  }

  onClickPlusFab(): void {
    if (this.router.url.includes('/content')) {
      this.openSectionFormDialog()
        .afterClosed()
        .subscribe((section: Section) => {
          if (section) {
            this.userGuideService.setCurrentSection(section);
            this.scrollToSection(section);
          }
        });
    } else if (this.router.url.includes('/release-notes')) {
      this.openReleaseNotesFormDialog({
        kTool: this.kTool,
      } as ReleaseNotes);
    }
  }

  private scrollToSection(section: Section): void {
    setTimeout(() => {
      this.router.navigate(['./'], {
        fragment: section.title,
        relativeTo: this.route,
      });
    }, 0);
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

  private openReleaseNotesFormDialog(
    releaseNotes?: ReleaseNotes
  ): MatDialogRef<ReleaseNotesFormDialogComponent, ReleaseNotes> {
    return this.dialog.open(ReleaseNotesFormDialogComponent, {
      disableClose: true,
      panelClass: 'form-dialog',
      width: '1080px',
      height: 'auto',
      data: releaseNotes,
    });
  }
}
