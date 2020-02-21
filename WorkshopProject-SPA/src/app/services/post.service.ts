import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  savePost(formData: FormData) {
    return this.http.post(this.baseUrl + 'posts/create', formData);
  }

  updatePost(formData: FormData) {
    return this.http.post(this.baseUrl + 'posts/edit', formData);
  }

  getPost(id: number) {
    return this.http.get<Post>(this.baseUrl + 'posts/' + id);
  }

  getAllPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts/');
  }

  getAllPostsByUserId(id: number) {
    return this.http.get<Post[]>(this.baseUrl + 'posts/GetPostsByUserId?userId=' + id);
  }

}
