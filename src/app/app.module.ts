import { UsersService } from './services/users.service';
import { LoginService } from './services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDeleteComponent } from './components/profile/profile-delete/profile-delete.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileDetailPostsComponent } from './components/profile/profile-detail/profile-detail-posts/profile-detail-posts.component';
import { HeaderService } from './services/header.service';
import { PostsService } from './services/posts.service';
import { SearchComponent } from './components/search/search.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProfileDetailComponent,
    SearchbarComponent,
    ProfileEditComponent,
    ProfileComponent,
    ProfileDeleteComponent,
    MainComponent,
    RegisterComponent,
    ProfileDetailPostsComponent,
    SearchComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    LoginService,
    HeaderService,
    PostsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
