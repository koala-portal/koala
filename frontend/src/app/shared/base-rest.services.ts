import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceLocator } from '../locator.service';

@Injectable()
export class BaseRestServices {
  private http: HttpClient;
  private devUrl = 'https://localhost:8443';

  /**
   * Build a common HttpClient object to hanle all of our REST calls
   */
  constructor() {
    this.http = ServiceLocator.injector.get(HttpClient);
    if (isDevMode()) {
      console.log(
        'Running in DEV mode: All REST calls will be directed at ' + this.devUrl
      );
    } else {
      console.log(
        'Running in PROD mode: All REST calls will be relative to this server'
      );
    }
  }

  /**
   * Protect the HttpClient object from any class that doesn't extend this one.
   */
  protected getHttpClient(): HttpClient {
    return this.http;
  }

  /**
   * Determine if we're running in Dev-Mode and if so provide the localhost address, otherwise we're in the compiled jar and we should use relative URLs.
   */
  protected getBaseHost(): string {
    if (isDevMode()) {
      return this.devUrl;
    } else {
      return '';
    }
  }
}
