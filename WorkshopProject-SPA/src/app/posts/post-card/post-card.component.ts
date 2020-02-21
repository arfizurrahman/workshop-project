import { AuthService } from './../../services/auth.service';
import { Post } from './../../models/post';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  currentUser = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.decodedToken.nameid === this.post.userId ? true : false;
  }

}
