import { UsersService } from '../../services/users.service';
import { User } from './../../models/user.model';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Mock } from '../../models/mock';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public login = Mock.login();
  public following: User[] = [];
  public show: boolean;

  constructor(private loginService: LoginService, private usersService: UsersService, private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.navbarIsOut.subscribe(next => {
      this.show = next;
    });

    this.usersService.following.subscribe((next) => {
      this.following = next;
    });

    this.loginService.getLogin()
      .then((login) => {
        this.login = login;
        this.usersService.doGetFollowing();
      });
  }

  logout() {
    this.loginService.doLogout();
    this.router.navigate(['login']);
  }

}
