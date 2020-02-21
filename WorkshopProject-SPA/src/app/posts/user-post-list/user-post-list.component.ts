import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.posts = data['posts'];
    // });
    this.loadPosts();
  }

  loadPosts() {
    const id = this.authService.decodedToken.nameid;
    this.postService.getAllPostsByUserId(id)
      .subscribe((res: Post[]) => {
      this.posts = res;
    }, error => {
      this.alertify.error(error);
    });
  }

}
