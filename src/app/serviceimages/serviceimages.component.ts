import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagedataserviceService } from './imagedataservice.service';

@Component({
  selector: 'app-serviceimages',
  templateUrl: './serviceimages.component.html',
  styleUrls: ['./serviceimages.component.css']
})
export class ServiceimagesComponent implements OnInit {
  selectedFile: File;

  constructor(private fb: FormBuilder,
    private _imagedata: ImagedataserviceService) { }

  imageform: FormGroup;

  ngOnInit(): void {

    this.imageform = this.fb.group({

      image: new FormControl(null, [Validators.required]),

    })
  }
  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }


onimageAdd() {
  let fd=new FormData();
  if (this.selectedFile != null) {
    fd.append('image', this.selectedFile, this.selectedFile.name);
  }
  else {
    fd.append('image', new Blob(), null);
  }
  fd.append('fk_s_id','1');
  this._imagedata.addImage(fd).subscribe(
    (data: any[]) => {
      console.log('Service images Added');
    }
  );

}



}
