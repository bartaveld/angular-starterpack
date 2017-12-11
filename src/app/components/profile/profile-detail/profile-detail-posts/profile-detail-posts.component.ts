import { ActivatedRoute } from '@angular/router';
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
  public username: string;
  public ownProfile = false;

  constructor(private postsService: PostsService, private loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((next) => {
      this.username = next['username'];
      if (this.username === undefined) {
        this.loginService.getLogin()
          .then((result) => {
            this.ownProfile = true;
            this.postsService.doGetPostsFromUser(result.username)
            .then((posts) => {
              this.posts = posts;
            });
          });
      } else {
        this.postsService.doGetPostsFromUser(this.username)
        .then((posts) => {
          this.posts = posts;
        });
      }
    });
  }

}
