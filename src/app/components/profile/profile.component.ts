import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public username: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.username = this.loginService.getUsername();
  }

}
