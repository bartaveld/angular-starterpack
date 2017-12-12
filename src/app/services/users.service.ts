import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HeaderService } from './header.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { LoginService } from './login.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class UsersService {

  private serverUrl = environment.serverUrl;

  public following = new Subject<User[]>();
  private savedFollowing: User[];

  constructor(private http: Http, private headerService: HeaderService, private loginService: LoginService) { }

  public doSearch(searchParam: string): Promise<User[]> {
    return this.http.get(this.serverUrl + '/users?username=' + searchParam, { headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        const userList: User[] = [];
        responseJson.forEach(element => {
          this.loginService.getLogin()
            .then((user) => {
              if (element.username !== user.username) {
                userList.push(element as User);
              }
            });
        });
        return userList;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public doGetUserByUsername(user: string): Promise<User> {
    return this.http.get(this.serverUrl + '/users?username=' + user, { headers: this.headerService.getHeaders()})
    .toPromise()
    .then(response => {
      const responseJson = response.json();

      return responseJson[0] as User;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

  public doGetFollowing() {
    this.http.get(this.serverUrl + '/followers', {headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        const userList: User[] = [];
        responseJson.forEach(element => {
          userList.push(element as User);
        });
        this.savedFollowing = userList;
        this.following.next(userList);
      })
      .catch(error => {
        this.handleError(error);
      });
  }


  public doGetSuggestions(): Promise<User[]> {
    return this.http.get(this.serverUrl + '/users/suggestions', {headers: this.headerService.getHeaders()})
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

  public checkIfFollowing(username: string): boolean {
    if (this.savedFollowing === undefined) {
      return undefined;
    } else {
      let found = false;
      this.savedFollowing.forEach(user => {
        if (user.username === username) {
          found = true;
          return found;
        }
      });
      return found;
    }
  }

  public doFollow(user: User) {
    return this.http.post(this.serverUrl + '/followers', {user: user.username },  {headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        this.doGetFollowing();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  public doMarkNotInteresting(username: string): Promise<any> {
    return this.http.post(this.serverUrl + '/not-interested', {user: username },  {headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  public doUnfollow(user: User) {
    return this.http.delete(this.serverUrl + '/followers', {headers: this.headerService.getHeaders(), body: {user: user.username }})
      .toPromise()
      .then(response => {
        this.doGetFollowing();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
