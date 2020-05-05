import { Component } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { Ticket } from '../tickets/ticket.model';
import { TicketService } from '../tickets/ticket.service';
import { User } from '../k-tools/user.model';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // TODO: set up hide/show additional views for tickets

  tickets: Ticket[];
  constructor(private ticketService: TicketService, private http: HttpClient) {}

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
    this.whoAmI().subscribe((u: User) => {
      console.debug(u);
      console.log(u.userName + ' is logged in as a(n) ' + u.role);
    });
  }

  whoAmI(): Observable<User> {
    const url = 'https://localhost:8443/api/whoami';

    return this.http.get(url, { withCredentials: true }).pipe(
      map((data: User) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }
}
