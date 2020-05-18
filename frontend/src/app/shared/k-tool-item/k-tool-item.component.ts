import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { KTool } from 'src/app/shared/k-tool.model';
import { MessageService } from 'src/app/shared/message.service';
import { KToolFormDialogComponent } from '../../k-tools/k-tool-form-dialog/k-tool-form-dialog.component';
import { KToolsService } from '../../k-tools/k-tools.service';

@Component({
  selector: 'app-k-tool-item',
  templateUrl: './k-tool-item.component.html',
  styleUrls: ['./k-tool-item.component.scss'],
})
export class KToolItemComponent {
  @Input() kTool: KTool;

  @Output() updated = new EventEmitter<KTool>();
  @Output() deleted = new EventEmitter<void>();

  userIsAdmin = true; // TODO: Placeholder

  constructor(
    private messageService: MessageService,
    private kToolsService: KToolsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.kTool = changes.kTool.currentValue;
  }

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
      this.updated.emit(kTool);
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
              this.deleted.emit();
              this.messageService.showMessage('Tool deleted');
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
