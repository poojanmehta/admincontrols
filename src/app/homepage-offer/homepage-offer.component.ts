import { Component, OnInit } from '@angular/core';
import { HomepageofferService } from '../homepageoffer.service';

@Component({
  selector: 'app-homepage-offer',
  templateUrl: './homepage-offer.component.html',
  styleUrls: ['./homepage-offer.component.css']
})
export class HomepageOfferComponent implements OnInit {

  constructor(private _homepage: HomepageofferService) { }

  ngOnInit(): void {
    this._homepage.getAllOffers().subscribe(
      (data: any[]) => {
        console.log(data);
      }
    )
  }

}
