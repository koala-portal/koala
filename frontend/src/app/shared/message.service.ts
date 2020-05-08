import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

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

  showInfoTst(message: string) {
    this.toastr.info(message);
  }

  showInfoDetailsTst(title: string, details: string) {
    this.toastr.info(details, title);
  }

  showSuccessTst(message: string) {
    this.toastr.success(message);
  }

  showSuccessWithDetailsTst(title: string, details: string) {
    this.toastr.success(details, title);
  }

  showErrorTst(message: string) {
    this.toastr.error(message);
  }

  showErrorWithDetailsTst(title: string, details: string) {
    this.toastr.error(details, title);
  }

  showMessage(message) {
    return this.snackBar.open(message, 'Okay', {
      duration: 4000,
    });
  }
}
