import { User } from './../../models/user.model';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

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
  public suggestions: User[] = [];

  constructor(private postsService: PostsService, private usersService: UsersService) { }

  ngOnInit() {
   this.postsService.posts.subscribe((next) => {
      this.posts = next;
    });
    this.postsService.doGetPosts();
    this.usersService.doGetSuggestions()
      .then((suggestions) => {
        this.suggestions = suggestions;
      });
  }

  public post() {
    this.posting = true;
    this.postsService.doMakePost(this.title, this.message)
      .then((post) => {
        this.posts.unshift(post);
        this.posting = false;
      });
  }

  public notInterested(username: string) {
    this.usersService.doMarkNotInteresting(username)
      .then(() => {
        this.suggestions.forEach((element, index) => {
          if (element.username === username) {
            this.suggestions.splice(index, 1);
          }
        });
      });
  }

  public canPost() {
    return !(this.message === '' || this.title === '' || this.posting);
  }

}
