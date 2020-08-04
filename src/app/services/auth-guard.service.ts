import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private alertifyService : AlertifyService) {}

  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      this.alertifyService.error("Sayfaya Ulaşabilmeniz İçin Giriş Yapmanız Gerekmektedir");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
