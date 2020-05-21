import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpEmitAction } from '../shared/http-emit-action.model';
import { UamForm } from './uam-form.model';
import { User } from '../shared/user.model';
import { Observable, Subject } from 'rxjs';
import { BaseRestServices } from '../shared/base-rest.services';

@Injectable({ providedIn: 'root' })
export class UamFormServices extends BaseRestServices {
  @Output() saveNewUamFormEmitter: EventEmitter<UamForm> = new EventEmitter<
    UamForm
  >();

  constructor() {
    super();
  }

  public saveUamForm(user: User): HttpEmitAction<UamForm> {
    var url = super.getBaseHost() + '/api/uamform';

    const returnVal: HttpEmitAction<UamForm> = {
      obser: super.getHttpClient().post<UamForm>(url, user),
      emit: this.saveNewUamFormEmitter,
      action: 'SAVE',
    };

    return returnVal;
  }

  public loadUamForms(status: string): Observable<UamForm[]> {
    var url = super.getBaseHost() + '/api/uamform';
    if (status) url = url + '?status=' + status;

    return super.getHttpClient().get<UamForm[]>(url);
  }

  public loadUsers(name: string): Observable<User[]> {
    var url = super.getBaseHost() + '/api/users';
    if (name) url = url + '?name=' + name;

    return super.getHttpClient().get<User[]>(url);
  }
}
