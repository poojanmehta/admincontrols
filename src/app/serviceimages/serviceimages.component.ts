import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagedataserviceService } from './imagedataservice.service';
import { ServiceService } from '../service/service.service';
import { service } from '../service/service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serviceimages',
  templateUrl: './serviceimages.component.html',
  styleUrls: ['./serviceimages.component.css']
})
export class ServiceimagesComponent implements OnInit {
  selectedFile: File;

  constructor(private fb: FormBuilder,
    private _imagedata: ImagedataserviceService,
    private _servicedata: ServiceService,
    private _act: ActivatedRoute) { }

  imageform: FormGroup;
  serviceArr: service[] = [];
  fk_s_id: number = null;

  ngOnInit(): void {
    this.fk_s_id = this._act.snapshot.params['s_id'];
    console.log(this.fk_s_id);
    this._servicedata.getAllServices().subscribe(
      (data:service[]) => {
        this.serviceArr = data;
        this.fk_s_id = this.serviceArr[0].s_id;
      }
    );

    this.imageform = this.fb.group({
      image: new FormControl(null, [Validators.required]),
      service_id: new FormControl([Validators.required])
    });
    this.imageform.controls['service_id'].setValue(this.fk_s_id);
  }

  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }

  onimageAdd(fk_s_id:number) {
    let fd = new FormData();
    if (this.selectedFile != null) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }
    fd.append('fk_s_id', fk_s_id.toString());
    this._imagedata.addImage(fd).subscribe(
      (data: any[]) => {
        console.log('Image Added');
        alert('Image Added Successfully');
      }
    );
  }
}
