import { AsyncPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuard, AuthModule, AuthService } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {

    return true;
    // console.log(this.auth.isAuthenticated$);
    
    // if (this.auth.isAuthenticated$) {
    //   // this.router.navigate(['/player']);
    //   return true;
    // }

    // // Navigate to the login page with extras
    // this.router.navigate(['/landing']);
    // return false;
  }
}