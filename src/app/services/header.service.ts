import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class HeaderService {

  constructor() { }

  public getHeaders() {
    return new Headers({ 'Content-Type': 'application/json', 'AuthToken' : localStorage.getItem('token') });
  }

}
