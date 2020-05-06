import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasedserviceService {
  url: string = environment.url + 'servicepurchase';

  constructor(private _http: HttpClient) { }

  getAllPurchasedService() {
    return this._http.get(this.url);
  }
}
