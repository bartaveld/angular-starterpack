import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { ProfileDeleteComponent } from './components/profile/profile-delete/profile-delete.component';
import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'profile', component: ProfileComponent, children : [
      {path: '', component: ProfileDetailComponent},
      {path: 'edit', component: ProfileEditComponent},
      {path: 'delete', component: ProfileDeleteComponent}
    ] },
    { path: 'profile/user/:username', component: ProfileDetailComponent},
    { path: 'post/:id', component: PostComponent}
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
