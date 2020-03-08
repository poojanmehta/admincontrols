import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { service } from '../service';
import { serviceimage } from '../../serviceimages/image';
import { ImagedataserviceService } from 'src/app/serviceimages/imagedataservice.service';
import { environment } from 'src/environments/environment';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

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
  imageArr: serviceimage[] = [];
  imageUrl: string = environment.url;
  slide: string[] = [];
  selectedImage: serviceimage;

  constructor(private _data: ServiceService,
    private _imagedata: ImagedataserviceService,
    private _act: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {

    this.s_id = this._act.snapshot.params['s_id'];
    this.updateform = new FormGroup({
      s_id: new FormControl(),
      s_name: new FormControl(null, [Validators.required]),
      s_price: new FormControl(null, [Validators.required]),
      s_dur: new FormControl(null, [Validators.required]),
      s_disc: new FormControl(null, [Validators.required]),
      s_ben: new FormControl(null, [Validators.required])
    });
    this._data.getServiceByID(this.s_id).subscribe(
      (data: service[]) => {
        console.log(data);
        this.data2 = data[0];
        this.formDataBind();
        this._imagedata.getImageById(this.data2.s_id).subscribe(
          (data: serviceimage[]) => {
            this.imageArr = data;
            console.log(this.imageArr);
            for (const item of this.imageArr) {
              let temp = this.imageUrl + 'images/service_images/' + item.image;
              this.slide.push(temp);
              console.log(this.slide)
            }
          }
        );
      }
    );

  }
  formDataBind() {
    this.updateform.patchValue({
      s_id: this.data2.s_id,
      s_name: this.data2.s_name,
      s_price: this.data2.s_price,
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

  addImage() {
    this._router.navigate(['/nav/serviceimages', this.data2.s_id]);
  }

  deleteImage(image: serviceimage) {
    this._imagedata.deleteImage(image.img_id).subscribe(
      (data: any) => {
        console.log(data);
        this.imageArr.splice(this.imageArr.indexOf(image), 1);
      }
    )
  }
}
