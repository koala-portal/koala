import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { KToolsService } from './k-tools.service';
import { KTool } from '../shared/k-tool.model';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KToolResolver implements Resolve<KTool> {
  constructor(private kToolsService: KToolsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<KTool> | Promise<KTool> | KTool {
    const id = +route.paramMap.get('id');
    return this.kToolsService.findById(id) || this.kToolsService.fetchById(id);
  }
}
