import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BaseRestServices } from './base-rest.services';

@Injectable({ providedIn: 'root' })
export class WhoAmIServices extends BaseRestServices {

  constructor() {
    super();
  }

  public whoAmI(): Observable<User> {
    return super.getHttpClient().get<User>(super.getBaseHost() + '/api/whoami'); 
  }
}
