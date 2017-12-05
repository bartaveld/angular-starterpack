import { LoginService } from './services/login.service';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements DoCheck {

  public loggedIn: boolean;

  constructor( private loginService: LoginService) {
    this.loggedIn = loginService.getLoggedIn();
  }

  ngDoCheck() {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }

}
