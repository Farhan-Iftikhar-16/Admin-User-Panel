import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return true;
    }

    if (user && user.role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard'], {queryParams: {returnUrl: state.url}}).then();
    }

    if (user && user.role === 'CUSTOMER') {
      this.router.navigate(['/user/dashboard'], {queryParams: {returnUrl: state.url}}).then();
    }


    return false;
  }

}
