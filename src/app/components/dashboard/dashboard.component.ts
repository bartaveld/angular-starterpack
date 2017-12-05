import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';
  users: User[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .then(users => this.users = users)
      .catch(error => console.log(error));
  }

  public logout() {
    this.loginService.doLogout();
  }


}
