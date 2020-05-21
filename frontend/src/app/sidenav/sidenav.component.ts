import { AppService } from './../app.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketService } from '../tickets/ticket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {}
