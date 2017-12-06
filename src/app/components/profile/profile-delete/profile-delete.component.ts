import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.css']
})
export class ProfileDeleteComponent implements OnInit {

  public deleting = false;

  constructor(private loginService: LoginService, private router: Router) {
   }

  ngOnInit() {
  }

  deleteProfile() {
    this.deleting = true;
    this.loginService.deleteLogin()
      .then(() => {
        this.router.navigate(['login']);
      });
  }

}
