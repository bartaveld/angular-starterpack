import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';
import { Location } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post: Post;
  public yourPost = false;
  public deleteMode = false;
  public editMode = false;
  public commentMessage = '';
  public loggedInUsername = '';

  constructor(private postsService: PostsService, private route: ActivatedRoute, private location: Location, private loginService: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe((next) => {
      this.postsService.doGetPostById(next['id'])
        .then((post) => {
          this.post = post;
          this.loginService.getLogin()
            .then((loginUser) => {
              if ( this.post.username === loginUser.username ) {
                this.yourPost = true;
              }
              this.loggedInUsername = loginUser.username;
            });
        });
    });
  }

  goBack() {
    this.location.back();
  }

  goDelete() {
    this.postsService.doDeletePost(this.post.id)
      .then(() => {
        this.goBack();
      });
  }

  comment() {
    this.postsService.doPostAComment(this.post.id, this.commentMessage)
      .then((newComments) => {
        this.post.comments = newComments;
      });
  }

  deleteComment(id: string) {
    this.postsService.doDeleteComment(this.post.id, id)
      .then((newComments) => {
        this.post.comments = newComments;
      });
  }

  editComment(id: string, message: string) {
    this.postsService.doEditComment(this.post.id, id, message)
      .then((newComments) => {
        this.post.comments = newComments;
      });
  }

  editPost(title: string, message: string) {
    this.postsService.doEditPost(this.post.id, title, message)
      .then((newPost) => {
        this.post = newPost;
        this.editMode = false;
      });
  }

}
