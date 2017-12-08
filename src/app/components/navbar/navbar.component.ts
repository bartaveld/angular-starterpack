import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Mock } from '../../models/mock';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public login = Mock.login();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.loginService.getLogin()
      .then((login) => {
        this.login = login;
      });
  }

  logout() {
    this.loginService.doLogout();
    this.router.navigate(['login']);
  }

}
