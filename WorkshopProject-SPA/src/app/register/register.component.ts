import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
     this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error('Registration failed');
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/posts']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
