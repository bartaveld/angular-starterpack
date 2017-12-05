import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Login } from '../models/login.model';


@Injectable()
export class LoginService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/login';

  private LOGGEDIN = 'loggedIn';
  private TOKEN = 'token';

  constructor(private http: Http) { }

  public doLogin(username: string, password: string): Promise<Login> {
    return this.http.post(this.serverUrl, {username: username, password: password})
      .toPromise()
      .then(response => {
        this.setLoggedIn(true);
        const login = response.json() as Login;
        this.setUsername(username);
        this.setToken(login.token);
        return login;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public doLogout() {
    this.setLoggedIn(false);
    this.setToken('');
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

  public getLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGEDIN) === 'true';
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  private setUsername(value: string) {
    localStorage.setItem('username', value);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  private setLoggedIn(value: boolean): void {
    if (value) {
      localStorage.setItem(this.LOGGEDIN, 'true');
    } else {
      localStorage.setItem(this.LOGGEDIN, 'false');
    }
  }

  private setToken(value: string): void {
    return localStorage.setItem(this.TOKEN, value);
  }



}
