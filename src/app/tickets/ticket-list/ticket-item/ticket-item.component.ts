import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ticket } from '../../ticket.model';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;
  @Output() ticketSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    console.log('adesfas')
    this.ticketSelected.emit();
  }

}
