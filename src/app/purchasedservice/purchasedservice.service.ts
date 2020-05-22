import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  assignTrainer(obj: any) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url, body, { headers: head });

  }
}
