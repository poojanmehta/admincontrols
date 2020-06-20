import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageofferService {
  private url: string = environment.url + 'homepage/';
  private productUrl: string = environment.url + 'product/';

  constructor(private _http: HttpClient) { }

  getAllOffers() {
    return this._http.get(this.url);
  }
  getOffersById(offer_id) {
    return this._http.get(this.url + offer_id);
  }
  getAllProducts() {
    return this._http.put(this.url + 0, JSON.stringify(0));
  }
  addProductsToCarousel(obj) {
    const body = JSON.stringify(obj);
    console.log(body);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url, body, { headers: head });
  }
  deleteProductFromCarousel(obj) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url, body, { headers: head });
  }
  getMultipleProducts(obj) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.productUrl + 0, body, { headers: head });
  }
}
