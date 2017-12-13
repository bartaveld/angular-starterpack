import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public loggedIn: boolean;
  public navBarShown: boolean;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private navbarService: NavbarService) {
  }

  ngOnInit() {
    this.navbarService.navbarIsOut.subscribe(next => {
      this.navBarShown = next;
    });

    this.loggedIn = this.loginService.getLoggedIn();
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
    } else {

    }
  }



}
