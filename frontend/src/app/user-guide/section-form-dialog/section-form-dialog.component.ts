import { Component, Inject } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Section } from '../section.model';
import { UserGuideService } from '../user-guide.service';

@Component({
  selector: 'app-section-form-dialog',
  templateUrl: './section-form-dialog.component.html',
  styleUrls: ['./section-form-dialog.component.scss'],
})
export class SectionFormDialogComponent {
  constructor(
    private messageService: MessageService,
    private userGuideService: UserGuideService,
    public dialogRef: MatDialogRef<SectionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {}

  onSubmit(section: Section): void {
    if (section.id) {
      this.userGuideService.putSection(section).subscribe(
        () => {
          this.dialogRef.close(section);
          this.messageService.showMessage('Section updated');
        },
        () => {
          this.messageService.showError('Unable to update section');
        }
      );
    } else {
      this.userGuideService.postSection(section).subscribe(
        () => {
          this.dialogRef.close(section);
          this.messageService.showMessage('Section created');
        },
        () => {
          this.messageService.showError('Unable to create section');
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
