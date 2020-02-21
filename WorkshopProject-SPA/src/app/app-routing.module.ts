import { UserPostListResolver } from './resolvers/user-post-list.resolver';
import { PostDetailsResolver } from './resolvers/post-details.resolver';
import { UserPostListComponent } from './posts/user-post-list/user-post-list.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ValuesComponent } from './values/values.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PostEditResolver } from './resolvers/post-edit.resolver';
import { PostListResolver } from './resolvers/post-list.resolver';


const routes: Routes = [
  {path: '', component: HomeComponent},
    {
        path: '', // path: 'dummy' => localhost:5000/dummymessages
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'posts', component: PostListComponent, resolve: {posts: PostListResolver}},
            {path: 'post-add', component: PostAddComponent},
            {path: 'post-edit/:id', component: PostEditComponent, resolve: {post: PostEditResolver}},
            {path: 'post-details/:id', component: PostDetailsComponent, resolve: {post: PostDetailsResolver}},
            {path: 'my-posts', component: UserPostListComponent, resolve: {posts: UserPostListResolver}},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
