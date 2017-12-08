import { User } from './../../../../models/user.model';
import { LoginService } from '../../../../services/login.service';
import { PostsService } from './../../../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../models/post.model';

@Component({
  selector: 'app-profile-detail-posts',
  templateUrl: './profile-detail-posts.component.html',
  styleUrls: ['./profile-detail-posts.component.css']
})
export class ProfileDetailPostsComponent implements OnInit {

  public posts: Post[] = [];

  constructor(private postsService: PostsService, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getLogin()
      .then((login: User) => {
        this.postsService.doGetPostsFromUser(login.username)
          .then((posts) => {
            this.posts = posts;
          });
      });
  }

}
