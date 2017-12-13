import { LoginService } from '../../services/login.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, DoCheck {

  public username = '';
  public password = '';
  public firstName = '';
  public lastName = '';
  public canRegister = false;
  public isRegistering = false;
  public didRegister = false;
  public usernameExists = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (!(this.username === '') && !(this.password === '') && !(this.firstName === '') && !(this.lastName === '')) {
      this.canRegister = true;
    } else {
      this.canRegister = false;
    }
  }

  register() {
    this.isRegistering = true;
    this.loginService.doRegister(this.username, this.password, this.firstName, this.lastName)
      .then((result: boolean) => {
        if (result) {
          this.isRegistering = false;
          this.didRegister = true;
        } else {
          this.isRegistering = false;
          this.usernameExists = true;
        }
      });
  }

}
