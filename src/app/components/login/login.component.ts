import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public wrong = false;
  public isLoggingIn = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.loginService.getLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  public login(): void {
    this.isLoggingIn = true;
    console.log(this.username + this.password);
    this.loginService.doLogin(this.username, this.password)
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.isLoggingIn = false;
        this.wrong = true;
      });
  }
}
