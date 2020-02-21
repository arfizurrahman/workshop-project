import { UserPostListResolver } from './resolvers/user-post-list.resolver';
import { PostDetailsResolver } from './resolvers/post-details.resolver';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { UserPostListComponent } from './posts/user-post-list/user-post-list.component';
import { PostEditResolver } from './resolvers/post-edit.resolver';
import { PostListResolver } from './resolvers/post-list.resolver';
import { TimeAgoPipe } from 'time-ago-pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    PostCardComponent,
    PostListComponent,
    PostAddComponent,
    PostEditComponent,
    PostDetailsComponent,
    UserPostListComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
      }
   }),
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    PostDetailsResolver,
    PostEditResolver,
    PostListResolver,
    UserPostListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
