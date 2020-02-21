import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Post;
  currentUser = false;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              public authService: AuthService,
              private alertify: AlertifyService) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.post = data['post'];
        this.currentUser = parseInt(this.authService.decodedToken.nameid) === this.post.userId ? true : false;
      });
    }

}
