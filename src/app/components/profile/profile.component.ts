import { Login } from './../../models/login.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public login = { username: '', firstName: '', lastName: '' };
  public isLoading = true;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getLogin()
      .then((result) => {
        this.isLoading = false;
        this.login = result;
      });
  }

}
