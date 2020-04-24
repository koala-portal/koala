import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceDesk } from './service-desk.model';

@Component({
  selector: 'app-service-desk',
  templateUrl: './service-desk.component.html',
  styleUrls: ['./service-desk.component.scss'],
})
export class ServiceDeskComponent implements OnInit {
  @Output() serviceDeskItemSelected = new EventEmitter<ServiceDesk>();

  serviceDeskItems: ServiceDesk[] = [
    new ServiceDesk(
      'Report a bug',
      'report an issue or bug with one of our applications'
    ),
    new ServiceDesk(
      'Technical Support',
      'need help with configuring, troubleshooting, getting connected? Select this to request assistance.'
    ),
    new ServiceDesk(
      'Submit a ticket/request',
      'Request a change, ask a question to our support team.'
    ),
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onNewServiceDesk() {
    this.router.navigate(['tickets/new'], { relativeTo: this.route });
  }
}
