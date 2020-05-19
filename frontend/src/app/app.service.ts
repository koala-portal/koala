import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  sidenavIsOpen = false;
  isLoading = true;
}
