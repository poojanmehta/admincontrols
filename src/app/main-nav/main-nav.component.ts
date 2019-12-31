import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  user_mail: String;
  user_login:Boolean;
  constructor(private breakpointObserver: BreakpointObserver, private _router: Router) { }
  ngOnInit() {
    if(localStorage.getItem('c_email') != null)
    {
      this.user_login=false;
    }
    else{
      this.user_login=true;
    }
    this.user_mail = localStorage.getItem('c_email');
  }
  logOut() {
    localStorage.clear();
    this._router.navigate(['/']);
  }
}
