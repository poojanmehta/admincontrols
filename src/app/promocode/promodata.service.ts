import { Injectable } from '@angular/core';
import { promo } from './promocode';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromodataService {
  url: string = environment.url + 'promo/';

  constructor(private _http: HttpClient) { }
  addPromocode(item: promo) {
    const body = JSON.stringify(item);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url, body, { headers: head });
  }

  getPromocode() {
    return this._http.get(this.url);
  }

  deletePromo(pro_id: number) {
    return this._http.delete(this.url + pro_id);
  }
}
