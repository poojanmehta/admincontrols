import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { client } from './login';
import { LogindataService } from './logindata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './clientlogin.component.html',
  styleUrls: ['./clientlogin.component.css']
})
export class ClientloginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private _loginData: LogindataService, private _route: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      c_email: new FormControl(null, [Validators.required]),
      c_pass: new FormControl(null, [Validators.required])
    });
  }
  onLogin() {
    if (this.loginForm.get('c_email').value != null) {
      console.log(this.loginForm.value)
      this._loginData.getlogin(this.loginForm.value).subscribe(
        (x: any[]) => {
          console.log(x);
          if (x.length == 1) {
            localStorage.setItem('c_email',this.loginForm.get('c_email').value);
            this._route.navigate(['/nav/product']);
          }
          else {
            alert('invalid');
          }
        }
      );
    }
    else {
      alert('uname or password must not be empty');
    }
  }
}
