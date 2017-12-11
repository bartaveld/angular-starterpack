import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts = [];
  public title = '';
  public message = '';
  public posting = false;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
   this.postsService.posts.subscribe((next) => {
      this.posts = next;
    });
    this.postsService.doGetPosts();
  }

  public post() {
    this.posting = true;
    this.postsService.doMakePost(this.title, this.message)
      .then((post) => {
        this.posts.unshift(post);
        this.posting = false;
      });
  }

  public canPost() {
    return !(this.message === '' || this.title === '' || this.posting);
  }

}
