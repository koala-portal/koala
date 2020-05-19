import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit(): void {}

  onClickLink() {
    this.appService.sidenavIsOpen = false;
  }
}
