import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UamFormServices } from '../uam-form.services';
import { MessageService } from 'src/app/shared/message.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/user.model';
import { UamForm } from '../uam-form.model';

@Component({
  selector: 'app-new-uam-form-dialog',
  templateUrl: './new-uam-form-dialog.component.html',
  styleUrls: ['./new-uam-form-dialog.component.scss'],
})
export class NewUamFormDialogComponent {
  constructor(
    private messageService: MessageService,
    private uamFormServices: UamFormServices,
    public dialogRef: MatDialogRef<NewUamFormDialogComponent>,
    private toastr: ToastrService
  ) {}

  onSubmit(user: User): void {
    this.uamFormServices.saveUamForm
    var httpResp = this.uamFormServices.saveUamForm(user);
      httpResp.obser.subscribe(
        (newForm:UamForm) => {
          this.dialogRef.close(true);
          this.messageService.showMessage('New Mission System Registration Created');
          httpResp.emit.emit(newForm);
        },
        (error: any) => {
          this.messageService.showErrorWithDetailsTst(error.error.error, error.error.resolution);
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
