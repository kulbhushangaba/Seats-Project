import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router,private token: TokenStorage) {}

    canActivate() {
      const user = (<any>window).user;
      const userdata = JSON.parse(this.token.getUser());
      if (userdata && userdata.isAdmin) return true;

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/login']);
      return false;
  }
}
