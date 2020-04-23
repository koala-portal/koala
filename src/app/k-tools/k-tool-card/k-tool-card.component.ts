import { Component, OnInit, Input } from '@angular/core';
import { KTool } from 'src/app/shared/k-tool.model';
import { MessageService } from 'src/app/shared/message.service';
import { KToolsService } from '../k-tools.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { KToolFormDialogComponent } from '../k-tool-form-dialog/k-tool-form-dialog.component';

@Component({
  selector: 'app-k-tool-card',
  templateUrl: './k-tool-card.component.html',
  styleUrls: ['./k-tool-card.component.scss'],
})
export class KToolCardComponent {
  @Input() kTool: KTool;

  userIsAdmin = true; // TODO: Placeholder

  constructor(
    private messageService: MessageService,
    private kToolsService: KToolsService,
    private dialog: MatDialog
  ) {}

  onClickStarTool(kTool: KTool): void {
    this.kToolsService.star(kTool).subscribe(() => {
      this.messageService.showMessage('Tool starred');
    });
  }

  onClickEditTool(kTool: KTool): void {
    this.openKToolFormDialog(kTool);
  }

  onClickDeleteTool(kTool: KTool): void {
    this.messageService
      .openConfirmDialog(
        'Delete Tool',
        `Are you sure you want to delete ${kTool.name}?`
      )
      .subscribe((confirm) => confirm && this.kToolsService.delete(kTool));
  }

  openKToolFormDialog(
    kTool?: KTool
  ): MatDialogRef<KToolFormDialogComponent, KTool> {
    return this.dialog.open(KToolFormDialogComponent, {
      disableClose: true,
      width: '500px',
      data: kTool,
    });
  }
}
