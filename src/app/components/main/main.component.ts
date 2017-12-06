import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public loggedIn: boolean;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loggedIn = this.loginService.getLoggedIn();
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
    } else {

    }
  }



}
