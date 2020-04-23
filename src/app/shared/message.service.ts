import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  openConfirmDialog(title: string, message: string): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, {
        width: '300px',
        data: {
          title,
          message,
        },
      })
      .afterClosed();
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
