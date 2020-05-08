import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { ReleaseNotes } from './release-notes.model';
import { ReleaseNotesFormDialogComponent } from './release-notes-form-dialog/release-notes-form-dialog.component';
import { ReleaseNotesService } from './release-notes.service';
import { MessageService } from '../shared/message.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
})
export class ReleaseNotesComponent implements OnInit, OnDestroy {
  releaseNotesList: ReleaseNotes[];

  selectedReleaseNote: ReleaseNotes;

  userIsAdmin = true;

  private parentRouteParamsSub: Subscription;
  private releaseNotesListSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private releaseNotesService: ReleaseNotesService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.parentRouteParamsSub = this.route.parent.params.subscribe((params) => {
      this.releaseNotesService.fetchAllByKToolId(params.id).subscribe(
        (releaseNotesList) => {
          this.releaseNotesService.setReleaseNotesList(releaseNotesList);
        },
        () => {
          this.messageService.showError('Unable to fetch Release Notes');
        }
      );
    });
    this.releaseNotesListSub = this.releaseNotesService.releaseNotesList$.subscribe(
      (releaseNotesList) => {
        this.releaseNotesList = releaseNotesList.sort((a, b) =>
          a.releaseDate < b.releaseDate ? 1 : -1
        );
        this.selectedReleaseNote =
          this.selectedReleaseNote || this.releaseNotesList[0];
      }
    );
  }

  ngOnDestroy(): void {
    this.parentRouteParamsSub.unsubscribe();
    this.releaseNotesListSub.unsubscribe();
  }

  onOpenReleaseNote(releaseNotes: ReleaseNotes): void {
    this.selectedReleaseNote = releaseNotes;
  }

  onClickEditReleaseNote(releaseNotes: ReleaseNotes): void {
    this.openReleaseNotesFormDialog(releaseNotes);
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
