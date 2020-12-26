/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-27 01:24:21
 * @modify date 2020-12-27 01:24:21
 * @desc [description]
 */
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const value = this.apiService.getCurrentUser;
    if (value) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(value.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    // , { queryParams: { returnUrl: state.url } }
    this.router.navigate(['']);
    return false;
  }
}
