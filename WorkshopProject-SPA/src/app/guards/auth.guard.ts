import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router,
                private alertify: AlertifyService) { }

    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        }

        this.alertify.error('You are not authorized to access this area');
        this.router.navigate(['/home']);
        return false;
    }
}
