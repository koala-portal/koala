import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import ConfirmDialogData from './confirm-dialog/confirm-dialog-data.model';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(
    title: string,
    message: string
  ): MatDialogRef<ConfirmDialogComponent, ConfirmDialogData> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title,
        message,
      },
    });
  }
}
