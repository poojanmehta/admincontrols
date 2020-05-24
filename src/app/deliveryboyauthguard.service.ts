import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeliveryboyauthguardService {

  constructor(private _router: Router) { }
  canActivate(_active: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Boolean {
    if (localStorage.getItem('c_email') != null) {
      return true;
    } else if (localStorage.getItem('db_id') != null) {
      return true;
    } else {
      alert('You are not allowed to view this page');
      return false;
    }
  }
}
