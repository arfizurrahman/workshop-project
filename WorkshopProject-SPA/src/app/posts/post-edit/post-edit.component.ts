import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  postEditForm: FormGroup;
  post: Post;
  postToUpdate: Post;
  fileToUpload: any = {};

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private postService: PostService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.post = data['post'];
    });

    this.createPostEditForm();
  }

  createPostEditForm() {
    this.postEditForm = this.fb.group({
      title: [this.post.title, Validators.required],
      description: [this.post.description, Validators.required],
      imageFile: [null]
    });
  }

  savePost() {
    if (this.postEditForm.valid) {
      this.postToUpdate = Object.assign({}, this.postEditForm.value);

      const formData = new FormData();
      if (this.postEditForm.get('imageFile').value !== null) {
        formData.append('imageFile', this.fileToUpload.data, this.fileToUpload.name);
      }
      formData.append('id', this.post.id.toString());
      formData.append('userId', this.post.userId.toString());
      formData.append('title', this.postToUpdate.title);
      formData.append('description', this.postToUpdate.description);

      this.postService.updatePost(formData)
        .subscribe((response) => {
          this.alertify.success('Post updated successfully');
          this.router.navigate(['/my-posts']);
        }, error => {
          this.alertify.error('Couldn\'t edit post');
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
