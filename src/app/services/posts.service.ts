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
        if(response.status === 204) {
          console.log('No content')
        } else {
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
          message: responseJson.message, username: responseJson.user, postedOn: responseJson.createdAt, comments: []});
        return newPost;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public doGetPostById(id: string): Promise<Post> {
    return this.http.get(this.serverUrl + '/posts/' + id, { headers: this.headerService.getHeaders()})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const post = new Post({id: responseJson._id, title: responseJson.title,
          message: responseJson.message, username: responseJson.user, postedOn: new Date(responseJson.createdAt)});
        const comments = [];
        responseJson.comments.forEach(comment => {
          comments.unshift(new Comment({id: comment._id, username: comment.user, message: comment.message, postedOn: new Date(comment.createdAt)}));
        });
        post.comments = comments;
        return post;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public doPostAComment(postId: string, message: string): Promise<Comment[]> {
    return this.http.post(this.serverUrl + '/posts/' + postId + '/comments', { message: message }, { headers: this.headerService.getHeaders()})
    .toPromise()
    .then(response => {
      const comments: Comment[] = [];
      response.json().comments.forEach(comment => {
        comments.unshift(new Comment({id: comment._id, username: comment.user, message: comment.message, postedOn: new Date(comment.createdAt)}));
      });
      return comments;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

  public doDeleteComment(postId: string, commentId: string): Promise<Comment[]> {
    return this.http.delete(this.serverUrl + '/posts/' + postId + '/comments/' + commentId, { headers: this.headerService.getHeaders()})
    .toPromise()
    .then(response => {
      const comments: Comment[] = [];
      response.json().comments.forEach(comment => {
        comments.unshift(new Comment({id: comment._id, username: comment.user, message: comment.message, postedOn: new Date(comment.createdAt)}));
      });
      return comments;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

  public doDeletePost(postId: string) {
    return this.http.delete(this.serverUrl + '/posts/' + postId, { headers: this.headerService.getHeaders()})
    .toPromise()
    .then(response => {
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

  public doEditComment(postId: string, commentId: string, message: string): Promise<Comment[]> {
    return this.http.put(this.serverUrl + '/posts/' + postId + '/comments/' + commentId, { message: message}, { headers: this.headerService.getHeaders()})
    .toPromise()
    .then(response => {
      const comments: Comment[] = [];
      response.json().comments.forEach(comment => {
        comments.unshift(new Comment({id: comment._id, username: comment.user, message: comment.message, postedOn: new Date(comment.createdAt)}));
      });
      return comments;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

  public doEditPost(postId: string, title: string, message: string): Promise<Post> {
    return this.http.put(this.serverUrl + '/posts/' + postId, { title: title, message: message}, { headers: this.headerService.getHeaders()})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const post = new Post({id: responseJson._id, title: responseJson.title,
        message: responseJson.message, username: responseJson.user, postedOn: new Date(responseJson.createdAt)});
      const comments: Comment[] = [];
      response.json().comments.forEach(comment => {
        comments.unshift(new Comment({id: comment._id, username: comment.user, message: comment.message, postedOn: new Date(comment.createdAt)}));
      });
      post.comments = comments;
      return post;
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
