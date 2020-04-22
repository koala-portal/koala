import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import ConfirmDialogData from './confirm-dialog/confirm-dialog-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

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

  showError(message) {
    return this.snackBar.open(message, 'Okay', {
      duration: 4000,
    });
  }

  showMessage(message) {
    return this.snackBar.open(message, 'Okay', {
      duration: 4000,
    });
  }
}
