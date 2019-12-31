import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private _router: Router) { }
  canActivate(_active: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Boolean {
    if (localStorage.getItem('c_email') != null) {
      return true;
    }
    else {
      alert('You are not Logged In');
      this._router.navigate(['/']);
      return false;
    }
  }
}
