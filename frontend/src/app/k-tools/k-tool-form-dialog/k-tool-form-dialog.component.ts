import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KToolsService } from '../k-tools.service';
import { MessageService } from 'src/app/shared/message.service';
import { KTool } from 'src/app/shared/k-tool.model';

@Component({
  selector: 'app-k-tool-form-dialog',
  templateUrl: './k-tool-form-dialog.component.html',
  styleUrls: ['./k-tool-form-dialog.component.scss'],
})
export class KToolFormDialogComponent {
  constructor(
    private messageService: MessageService,
    private kToolsService: KToolsService,
    public dialogRef: MatDialogRef<KToolFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KTool
  ) {}

  onSubmit(kTool: KTool): void {
    if (kTool.id) {
      this.kToolsService.put(kTool).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('Tool updated');
        },
        () => {
          this.messageService.showError('Unable to update tool');
        }
      );
    } else {
      this.kToolsService.post(kTool).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('Tool created');
        },
        () => {
          this.messageService.showError('Unable to create tool');
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
