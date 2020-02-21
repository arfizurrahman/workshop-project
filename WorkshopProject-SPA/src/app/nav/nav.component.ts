import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next =>  {
     this.alertify.success('Loggged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/posts']);
    });
  }

  loggedIn() {
     return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
