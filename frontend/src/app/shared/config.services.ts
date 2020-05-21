import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseRestServices } from './base-rest.services';

@Injectable({ providedIn: 'root' })
export class ConfigServices extends BaseRestServices {
  readonly koalaOrgName: string = 'KXX';

  constructor() {
    super();
  }

  public getPublicConfig(key: string): Observable<string> {
    return super
      .getHttpClient()
      .get<string>(super.getBaseHost() + '/api/config/' + key);
  }
}
