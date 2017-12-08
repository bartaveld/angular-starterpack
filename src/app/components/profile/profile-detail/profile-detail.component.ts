import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Mock } from '../../../models/mock';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  public dropDownShown = true;
  public login = Mock.login();
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
