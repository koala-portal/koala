import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseRestServices } from './base-rest.services';

@Injectable({ providedIn: 'root' })
export class ConfigServices extends BaseRestServices {

  constructor() {
    super();
  }

  public getPublicConfig(key:String): Observable<String> {
    return super.getHttpClient().get<String>(super.getBaseHost() + '/api/config/' + key);
  }

}
