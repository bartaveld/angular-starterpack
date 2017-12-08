import { User } from './../../../models/user.model';
import { LoginService } from '../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {


  public firstName: string;
  public lastName: string;
  public username: string;
  public imagePath: string;
  public login: User;
  public isUpdating = false;

  constructor(
    private logingService: LoginService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.logingService.getLogin()
      .then((login) => {
          this.login = login;
          this.username = login.username;
          this.firstName = login.firstName;
          this.lastName = login.lastName;
          this.imagePath = login.imagePath;
      });
  }

  updateUser() {
    this.isUpdating = true;
    this.login.firstName = this.firstName;
    this.login.lastName = this.lastName;
    this.login.imagePath = this.imagePath;
    this.logingService.updateLogin(this.login)
      .then(() => {
        this.router.navigate(['..'], {relativeTo: this.route});
      });
  }

}
