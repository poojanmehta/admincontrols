import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailsenderdataService } from './emailsenderdata.service';

@Component({
  selector: 'app-emailsender',
  templateUrl: './emailsender.component.html',
  styleUrls: ['./emailsender.component.css']
})
export class EmailsenderComponent implements OnInit {

  constructor(private _fb: FormBuilder,
              private _emaildata:EmailsenderdataService) { }

  emailform: FormGroup;

  ngOnInit() {
    this.emailform = this._fb.group({
      receiver: new FormControl(null, [Validators.required]),
      message: new FormControl(null),
      subject: new FormControl(null)
    });
  }
  onSend(){
    this._emaildata.sendEmail(this.emailform.value).subscribe(
      (data:any) => {
        console.log(data);
      }
    );
  }

}
