import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ReleaseNotes } from '../release-notes.model';
import { MessageService } from 'src/app/shared/message.service';
import { ReleaseNotesService } from '../release-notes.service';

@Component({
  selector: 'app-release-notes-form-dialog',
  templateUrl: './release-notes-form-dialog.component.html',
  styleUrls: ['./release-notes-form-dialog.component.scss'],
})
export class ReleaseNotesFormDialogComponent {
  constructor(
    private messageService: MessageService,
    private releaseNotesService: ReleaseNotesService,
    public dialogRef: MatDialogRef<ReleaseNotesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReleaseNotes
  ) {}

  onSubmit(releaseNotes: ReleaseNotes): void {
    if (releaseNotes.id) {
      this.releaseNotesService.put(releaseNotes).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('Release notes updated');
        },
        () => {
          this.messageService.showError('Unable to update release notes');
        }
      );
    } else {
      this.releaseNotesService.post(releaseNotes).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('Release notes created');
        },
        () => {
          this.messageService.showError('Unable to create release notes');
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
