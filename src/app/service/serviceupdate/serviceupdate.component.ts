import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { service } from '../service';

@Component({
  selector: 'app-serviceupdate',
  templateUrl: './serviceupdate.component.html',
  styleUrls: ['./serviceupdate.component.css']
})
export class ServiceupdateComponent implements OnInit {
  updateform: FormGroup;
  fd = new FormData();
  data2: service;
  s_id: number;

  constructor(private _data: ServiceService,
    private _act: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {

    this.s_id = this._act.snapshot.params['s_id'];
    this.updateform = new FormGroup({
      s_id: new FormControl(),
      s_name: new FormControl(null, [Validators.required]),
      s_price:new FormControl(null,[Validators.required]),
      s_dur: new FormControl(null, [Validators.required]),
      s_disc: new FormControl(null, [Validators.required]),
      s_ben: new FormControl(null, [Validators.required])
    });
    this._data.getServiceByID(this.s_id).subscribe(
      (data: service[]) => {
        console.log(data);
        this.data2 = data[0];
        this.formDataBind();
      }
    );
  }
  formDataBind() {
    this.updateform.patchValue({
      s_id: this.data2.s_id,
      s_name:this.data2.s_name,
      s_price:this.data2.s_price,
      s_dur: this.data2.s_dur,
      s_disc: this.data2.s_disc,
      s_ben: this.data2.s_ben
    });
  }
  onUpdate() {
    this._data.updateService(this.updateform.value).subscribe(
      (data: any[]) => {
        console.log(data)
        this._router.navigate(['/nav/servicedisplay']);
      }
    );
  }

}
