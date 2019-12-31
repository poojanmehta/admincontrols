import { Component, OnInit } from '@angular/core';
import { SignupDataService } from './signupdata.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { client } from '../clientlogin/login';

@Component({
  selector: 'app-clientsignup',
  templateUrl: './clientsignup.component.html',
  styleUrls: ['./clientsignup.component.css']
})
export class ClientsignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private _signupData: SignupDataService) { }

  ngOnInit() {

    this.signupForm = new FormGroup({
      c_email: new FormControl(null,[Validators.required, Validators.email]),
      c_name: new FormControl(null,[Validators.required]),
      c_pass: new FormControl(null,[Validators.required]),
      c_con: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      c_dob: new FormControl(null,[Validators.required]),
      c_b_pic: new FormControl(null),
      c_a_pic: new FormControl(null),
      c_type: new FormControl(null,[Validators.required]),
      c_gen: new FormControl(null,[Validators.required])
    });
  }
  onSignUp() {
    if (this.signupForm.get('c_email').value != null) {

      console.log(this.signupForm.value);
      this._signupData.onsignup(this.signupForm.value).subscribe(
        (x: client[]) => {
          console.log(x)
          if (x.length == 1) {
            alert('valid');
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

