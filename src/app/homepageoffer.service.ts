import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageofferService {
  private url: string = environment.url + 'homepage/';
  constructor(private _http:HttpClient) { }

  getAllOffers() {
    return this._http.get(this.url);
  }
  getOffersById(offer_id) {
    return this._http.get(this.url + offer_id);
  }

}
