import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HeaderService } from './header.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {

  private serverUrl = environment.serverUrl;

  constructor(private http: Http, private headerService: HeaderService) { }

  public doSearch(searchParam: string): Promise<User[]> {
    return this.http.get(this.serverUrl + '/users?username=' + searchParam, { headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        const userList: User[] = [];
        responseJson.forEach(element => {
          userList.push(element as User);
        });
        return userList;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
