import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserGuideService } from './user-guide.service';
import { Section } from './section.model';
import { SectionFormDialogComponent } from './section-form-dialog/section-form-dialog.component';
import { KTool } from 'src/app/shared/k-tool.model';

import { Subscription } from 'rxjs';
import { UserGuide } from './user-guide.model';

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

  onClickAddSection(): void {
    this.openSectionFormDialog()
      .afterClosed()
      .subscribe((section: Section) => {
        if (section) {
          this.userGuideService.setCurrentSection(section);
          this.scrollToSection(section);
        }
      });
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
}
