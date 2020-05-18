import { Component, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { KTool } from 'src/app/shared/k-tool.model';
import { MessageService } from 'src/app/shared/message.service';
import { KToolsService } from '../../k-tools/k-tools.service';
import { KToolFormDialogComponent } from '../../k-tools/k-tool-form-dialog/k-tool-form-dialog.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-k-tool-item',
  templateUrl: './k-tool-item.component.html',
  styleUrls: ['./k-tool-item.component.scss'],
})
export class KToolItemComponent {
  @Input() kTool: KTool;

  userIsAdmin = true; // TODO: Placeholder

  constructor(
    private messageService: MessageService,
    private kToolsService: KToolsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  get isGuideLinkHidden(): boolean {
    return (
      this.router.url.includes('user-guide') ||
      this.router.url.includes('release-notes')
    );
  }

  onClickStarTool(kTool: KTool): void {
    this.kToolsService.star(kTool).subscribe(() => {
      this.messageService.showMessage('Tool starred');
    });
  }

  onClickEditTool(kTool: KTool): void {
    this.openKToolFormDialog(kTool).subscribe((kTool) => {
      this.kTool = kTool;
    });
  }

  onClickDeleteTool(kTool: KTool): void {
    this.messageService
      .openConfirmDialog(
        'Delete Tool',
        `Are you sure you want to delete ${kTool.name}?`
      )
      .subscribe((confirm) => {
        if (confirm) {
          this.kToolsService.delete(kTool).subscribe(
            () => {
              this.messageService.showMessage('Deleted Tool');
            },
            () => {
              this.messageService.showMessage('Unable to Delete Tool');
            }
          );
        }
      });
  }

  openKToolFormDialog(kTool?: KTool): Observable<KTool> {
    return this.dialog
      .open(KToolFormDialogComponent, {
        disableClose: true,
        panelClass: 'form-dialog',
        width: '500px',
        data: kTool,
      })
      .afterClosed();
  }
}
