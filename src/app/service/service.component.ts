import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private _servicedata: ServiceService,
    private fb: FormBuilder,
    private _router: Router) { }

  serviceForm: FormGroup;

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      s_name: new FormControl(null, [Validators.required]),
      s_price: new FormControl(null, [Validators.required]),
      s_dur: new FormControl(null, [Validators.required]),
      s_disc: new FormControl(null, [Validators.required]),
      s_ben: new FormControl(null, [Validators.required])
    })


  }

  onAddService() {
    this._servicedata.addService(this.serviceForm.value).subscribe(
      (data: any[]) => {
        console.log('Service added');
        this._router.navigate(['/nav/servicedisplay']);
      }
    );
  }
}
