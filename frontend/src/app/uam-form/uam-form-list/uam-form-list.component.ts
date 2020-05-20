import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigServices } from '../../shared/config.services';
import { WhoAmIServices } from '../../shared/whoami.services';
import { UamFormServices } from '../uam-form.services';
import { UamForm } from '../uam-form.model';
import { NewUamFormDialogComponent } from '../new-uam-form-dialog/new-uam-form-dialog.component';


@Component({
  selector: 'uam-form-list',
  templateUrl: './uam-form-list.component.html',
  styleUrls: ['./uam-form-list.component.scss'],
})
export class UamFormListComponent implements OnInit, OnDestroy {

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private configServices: ConfigServices,
    private whoAmIServices: WhoAmIServices,
    private uamFormServices: UamFormServices
  ) {}

  @ViewChild('uamFormGrid') uamFormGrid: AgGridAngular;

  willEmailBeSent: String;

  userIsAdmin = false;

  uamForms: UamForm[];

  gridOptions = {
    columnDefs: [
      {headerName: 'Org', field: 'organization', checkboxSelection: true },
      {headerName: 'Owner', field: 'ownerLabel'},
      {headerName: 'Status', field: 'status'},
      {headerName: 'Created By', field: 'createdByLabel'},
      {headerName: 'Created', field: 'created'},
      {headerName: 'A & A', field: 'authAndAccredNumber'}
    ],
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      // allow every column to be aggregated
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
      sortable: true,
      filter: true
  },
  sideBar: 'columns'
};

  rowData: UamForm[];

  ngOnInit(): void {
    //Get the user's role
    this.whoAmIServices.whoAmI().subscribe(
        (user)=> {
          this.userIsAdmin = user.role == "ADMIN";
        },
        (error: any)=> {
          this.messageService.showErrorWithDetailsTst(  error.error.resolution,
                                                        error.error.error);
          this.userIsAdmin = false; //Ensure that we don't let them operate as an admin 
        }
    );

    //Get the config values for the Top Questions category
    this.configServices.getPublicConfig("uam.form.send.assignee.email").subscribe(
        (val)=> {
          this.willEmailBeSent = val;
        },
        (error: any)=> {
          this.messageService.showErrorWithDetailsTst(  error.error.resolution,
                                                        error.error.error);
        }
    );

    //By default lets load everything the user has access to
    this.loadAllUamForms(null);

    //Set up a listener for any time a new UAM Form is created
    this.uamFormServices.saveNewUamFormEmitter.subscribe((newForm:UamForm) => {
      this.loadAllUamForms(null);
    });
  }

  //Pass in null to get all UAM forms for this user
  loadAllUamForms(status:String): void {
    this.uamFormServices.loadUamForms(status).subscribe(
        (val)=> {
          this.rowData = val;
        },
        (error: any)=> {
          this.messageService.showErrorWithDetailsTst(  error.error.resolution,
                                                        error.error.error);
        }
    );
  }

  getSelectedRows() {
    const selectedNodes = this.uamFormGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.id + ' ' + node.ownerId).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onUamFormSelected(event) {
    alert(event);
  }

  ngOnDestroy(): void {
    //this.paramsSub.unsubscribe();
  }

  onClickCreateNewForm(): void {
    this.openNewUamFormDialog();
  }

  openNewUamFormDialog(): MatDialogRef<NewUamFormDialogComponent, void> {
    return this.dialog.open(NewUamFormDialogComponent, {
      disableClose: true,
      panelClass: 'form-dialog',
      width: '500px'
    });
  }
}
