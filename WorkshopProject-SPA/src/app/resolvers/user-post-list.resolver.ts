import { AuthService } from './../services/auth.service';
import { Post } from './../models/post';
import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class UserPostListResolver implements Resolve<Post[]> {

    constructor(private postService: PostService, private router: Router,
                private authService: AuthService,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        const id = this.authService.decodedToken.nameid;
        return this.postService.getAllPostsByUserId(id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }


}
