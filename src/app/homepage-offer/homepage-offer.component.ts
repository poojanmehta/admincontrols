import { Component, OnInit } from '@angular/core';
import { HomepageofferService } from '../homepageoffer.service';
import { Form, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage-offer',
  templateUrl: './homepage-offer.component.html',
  styleUrls: ['./homepage-offer.component.css']
})
export class HomepageOfferComponent implements OnInit {
offerform:FormGroup
selectedfile:File;
  constructor(private _homepage: HomepageofferService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.offerform=this.fb.group({
      offer_img:new FormControl(Validators.required),
      offer_link:new FormControl(Validators.required),
      offer_discription:new FormControl(Validators.required)
    })
    this._homepage.getAllOffers().subscribe(
      (data: any[]) => {
        console.log(data);
      }
    )
  }
  onadd() {
    console.log(this.offerform.value.t_name);
    let fd = new FormData();
    fd.append('offer_link', this.offerform.value.offer_link);
    fd.append('offer_discription', this.offerform.value.offer_discription);
    if (this.selectedfile != null) {
      fd.append('image', this.selectedfile, this.selectedfile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }

  };

  onChange(f) {
    this.selectedfile= <File>f.target.files[0];
  }
}
