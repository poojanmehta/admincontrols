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
  selectedFile: File = null;


  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      s_name: new FormControl(null, [Validators.required]),
      s_price: new FormControl(null, [Validators.required]),
      s_dur: new FormControl(null, [Validators.required]),
      s_disc: new FormControl(null, [Validators.required]),
      s_ben: new FormControl(null, [Validators.required]),
      s_cover_img: new FormControl(null)
    })


  }

  onAddService() {

    let fd = new FormData();
    fd.append('s_name', this.serviceForm.value.s_name);
    fd.append('s_price', this.serviceForm.value.s_price);
    fd.append('s_dur', this.serviceForm.value.s_dur);
    fd.append('s_disc', this.serviceForm.value.s_disc);
    fd.append('s_ben', this.serviceForm.value.s_ben);
    if (this.selectedFile != null) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    } else {
      fd.append('image', new Blob(), null);
    }

    this._servicedata.addService(fd).subscribe(
      (data: any[]) => {
        console.log('Service added');
        this._router.navigate(['/nav/servicedisplay']);
      }
    );
  }

  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }
}
