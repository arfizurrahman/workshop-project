import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { PostService } from '../services/post.service';

@Injectable()
export class PostEditResolver implements Resolve<Post> {

    constructor(private postService: PostService, private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post> {
        return this.postService.getPost(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/posts']);
                return of(null);
            })
        );
    }


}
