import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  postSaveForm: FormGroup;
  post: Post;
  fileToUpload: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private postService: PostService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.createPostSaveForm();
  }

  createPostSaveForm() {
    this.postSaveForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageFile: [null, Validators.required]
    });
  }

  savePost() {
    if (this.postSaveForm.valid) {
      this.post = Object.assign({}, this.postSaveForm.value);

      const formData = new FormData();
      formData.append('imageFile', this.fileToUpload.data, this.fileToUpload.name);
      formData.append('title', this.post.title);
      formData.append('description', this.post.description);

      this.postService.savePost(formData)
        .subscribe((response) => {
          this.alertify.success('Post saved successfully');
          this.createPostSaveForm();
        }, error => {
          this.alertify.error(error);
        });
    }
  }

  onSelectFile(files: FileList) {
    const fileReader = new FileReader();

    if (files.length > 0) {
      const file = files.item(0);

      fileReader.readAsDataURL(file);
      this.fileToUpload.data = file;
      this.fileToUpload.name = file.name;
    }

  }

}
