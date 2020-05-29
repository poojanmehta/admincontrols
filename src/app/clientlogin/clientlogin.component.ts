import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { client } from './login';
import { LogindataService } from './logindata.service';
import { Router } from '@angular/router';
import { DeliveryboyService } from '../deliveryboy.service';

@Component({
  selector: 'app-login',
  templateUrl: './clientlogin.component.html',
  styleUrls: ['./clientlogin.component.css']
})
export class ClientloginComponent implements OnInit {

  loginForm: FormGroup;
  dboyLoginForm: FormGroup;
  constructor(private _loginData: LogindataService, private _route: Router,
    private _dboyData: DeliveryboyService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      c_email: new FormControl('poojanmehta2000@gmail.com', [Validators.required]),
      c_pass: new FormControl('12345678', [Validators.required])
    });
    this.dboyLoginForm = new FormGroup({
      db_email: new FormControl(null, [Validators.required]),
      db_password: new FormControl(null, [Validators.required])
    });
  }
  onLogin() {
    if (this.loginForm.get('c_email').value != null) {
      console.log(this.loginForm.value)
      this._loginData.getlogin(this.loginForm.value).subscribe(
        (x: any[]) => {
          console.log(x);
          if (x.length == 1) {
            localStorage.setItem('c_email', this.loginForm.get('c_email').value);
            this._route.navigate(['/nav/product']);
          } else {
            alert('invalid');
          }
        }
      );
    }
    else {
      alert('uname or password must not be empty');
    }
  }
  onDboyLogin() {
    if (this.dboyLoginForm.valid === true) {
      this._dboyData.checkDboyLogin(this.dboyLoginForm.value).subscribe(
        (x: any[]) => {
          console.log(x);
          if (x.length == 1) {
            localStorage.setItem('db_email', this.dboyLoginForm.get('db_email').value);
            localStorage.setItem('db_id', x[0].db_id);
            console.log(localStorage.getItem('db_id'));
            this._route.navigate(['/delivery', x[0].db_id
            ]);
          }
          else {
            alert('invalid');
          }
        }
      );
    }
  }
}
