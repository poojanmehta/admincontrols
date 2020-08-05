import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicepurchaseDetailService {

  constructor(private _http: HttpClient) { }
  private url: string = environment.url + "servicepurchase/";

  getPurchasedServiceByID(obj) {
    const body = JSON.stringify(obj);
    console.log(body);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url + obj.sp_id, body, { headers: head });
  }
  getTrainerById(t_id) {
    return this._http.get(this.url + t_id);
  }

}
