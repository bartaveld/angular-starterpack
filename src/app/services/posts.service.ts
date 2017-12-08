import { Comment } from './../models/comment.model';
import { Subject } from 'rxjs/Rx';
import { Post } from './../models/post.model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HeaderService } from './header.service';
import { environment } from '../../environments/environment';

@Injectable()
export class PostsService {

  public posts = new Subject<Post[]>();
  private savedPosts: Post[] = [];
  private savedPost: Post;
  private serverUrl = environment.serverUrl;

  constructor(private http: Http, private headerService: HeaderService) {
   }

  public doGetPosts(): void {
    if (this.savedPosts.length !== 0) {
      this.posts.next(this.savedPosts);
    }
    this.http.get(this.serverUrl + '/posts/followers', { headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        if (this.savedPost === undefined || this.savedPost.id !== responseJson[0]._id || response.status === 200 ) {
          const postsList = [];
          responseJson.forEach((post, index) => {
            const newPost = new Post({id: post._id, title: post.title, message: post.message, username: post.user, postedOn: new Date(post.createdAt)});
            const comments = [];
            post.comments.forEach(comment => {
              comments.unshift(new Comment({id: comment._id, username: comment.user, message: comment.message, postedOn: new Date(comment.createdAt)}));
            });
            newPost.comments = comments;

            if (index === 0) {
              this.savedPost = newPost;
            }
            postsList.push(newPost);
          });
          this.savedPosts = postsList;
          this.posts.next(postsList);
        }
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public doGetPostsFromUser(username: string): Promise<Post[]> {
    return this.http.get(this.serverUrl + '/posts?username=' + username, { headers: this.headerService.getHeaders()})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
        const postsList = [];
        responseJson.forEach((post, index) => {
          const newPost = new Post({id: post._id, title: post.title, message: post.message, username: post.user, postedOn: new Date(post.createdAt)});
          const comments = [];
          post.comments.forEach(comment => {
            comments.unshift(new Comment({id: comment._id, username: comment.user, message: comment.message, postedOn: new Date(comment.createdAt)}));
          });
          newPost.comments = comments;
          postsList.push(newPost);
        });
        return postsList;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

  public doMakePost(title: string, message: string): Promise<Post> {
    return this.http.post(this.serverUrl + '/posts', {title: title, message: message}, { headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const newPost = new Post({id: responseJson._id, title: responseJson.title,
          message: responseJson.message, username: responseJson.user, postedOn: responseJson.createdAt});
        return newPost;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public clearPosts() {
    this.savedPost = undefined;
    this.savedPosts = [];
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
