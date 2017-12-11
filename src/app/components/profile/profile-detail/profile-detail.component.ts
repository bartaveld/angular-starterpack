import { UsersService } from './../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Mock } from '../../../models/mock';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, DoCheck {

  public user = Mock.login();
  public isLoading = true;
  public username: string;
  public isOwnProfile = false;
  public followhover = false;
  public youAreFollowing: boolean = undefined;
  public doesNotExist = false;

  constructor(private loginService: LoginService, private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((next) => {
      this.username = next['username'];
      this.youAreFollowing = undefined;
      if (this.username === undefined) {
        this.loginService.getLogin()
          .then((result) => {
            this.isLoading = false;
            this.isOwnProfile = true;
            this.user = result;
          });
      } else {
        this.loginService.getLogin()
          .then((loginUser) => {
            if (this.username === loginUser.username) {
              this.router.navigate(['/profile']);
            } else {
              this.usersService.doGetUserByUsername(this.username)
                .then((result) => {
                  if (result === undefined) {
                    this.doesNotExist = true;
                  } else {
                    this.user = result;
                  }
                  this.isLoading = false;
                });
            }
          });
      }
    });
  }

  public follow() {
    this.usersService.doFollow(this.user);
    this.youAreFollowing = true;
  }

  public unfollow() {
    this.usersService.doUnfollow(this.user);
    this.youAreFollowing = false;
    this.followhover = false;
  }

  ngDoCheck() {
    if (this.youAreFollowing === undefined) {
      this.youAreFollowing = this.usersService.checkIfFollowing(this.username);
    }
  }

}
