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
  private serverUrl = environment.serverUrl;

  private login: Login;
  private LOGGEDIN = 'loggedIn';
  private TOKEN = 'token';
  private USERNAME = 'username';

  constructor(private http: Http) { }

  public doLogin(username: string, password: string): Promise<Login> {
    return this.http.post(this.serverUrl + '/login', {username: username, password: password}, { headers: this.getHeaders()})
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        this.setLoggedIn(true);
        this.setToken(response.json().token);
        this.setUsername(response.json().username);

        delete responseJson.token;
        delete responseJson.login;

        const login = responseJson as Login;
        this.setLogin(login);
        return login;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public updateLogin(newLogin: Login): Promise<Login> {
    return this.http.put(this.serverUrl + '/users', {firstName: newLogin.firstName, lastName: newLogin.lastName}
    , { headers: this.getHeaders()})
      .toPromise()
      .then(response => {
        const login = this.login;
        login.firstName = newLogin.firstName;
        login.lastName = newLogin.lastName;
        this.setLogin(login);
        return login;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public deleteLogin(): Promise<Login> {
    return this.http.delete(this.serverUrl + '/users' , { headers: this.getHeaders()})
      .toPromise()
      .then(response => {
        this.doLogout();
        return this.login;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public doRegister(username: string = '', password: string = '', firstName: string = '', lastName: string = ''): Promise<boolean> {
    return this.http.post(this.serverUrl + '/users', {username: username, password: password
      , firstName: firstName, lastName: lastName}, { headers: this.getHeaders() })
      .toPromise()
      .then(response => {
          return true;
      })
      .catch(error => {
        return false;
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

  public getLogin(): Promise<Login> {
    if (this.login === undefined) {
      return this.http.get(this.serverUrl + '/users/' + this.getUsername(), { headers: this.getHeaders() })
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        delete responseJson.token;
        delete responseJson.login;

        const login = responseJson as Login;
        this.setLogin(login);
        return login;
      })
      .catch(error => {
        return this.handleError(error);
      });
    } else {
      return new Promise<Login>((resolve, reject) => {
        resolve(this.login);
      });
    }
  }

  private setLogin(login: Login) {
    this.login = login;
  }

  private setUsername(value: string) {
    localStorage.setItem(this.USERNAME, value);
  }

  private getUsername(): string {
    return localStorage.getItem(this.USERNAME);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN);
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

  private getHeaders() {
    return new Headers({ 'Content-Type': 'application/json', 'AuthToken' : this.getToken() });
  }



}
