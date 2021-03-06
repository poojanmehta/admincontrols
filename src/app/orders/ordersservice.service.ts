import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersserviceService {
  url: string = environment.url + 'order/';
  url2: string = environment.url + 'ordersnotassigned/';
  url3: string = environment.url + 'ordersassigned/';
  url4: string = environment.url + 'userhistory/';


  constructor(private _router: Router,
    private _http: HttpClient) { }

  getAllOrders() {
    return this._http.get(this.url);
  }
  getAllNotAssignedOrders() {
    return this._http.get(this.url2);
  }
  getAllAssignedOrders() {
    return this._http.get(this.url3);
  }
  assignDeliveryboy(obj: any) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url2, body, { headers: head });
  }
  sendShipmentMailClient(obj: any) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url2 + 0, body, { headers: head });
  }
  sendShipmentMailDboy(obj: any) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url2 +0, body, { headers: head });
  }
  sendCompleteMailClient(obj: any) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url3 +0, body, { headers: head });
  }
  updateStatus(obj: any) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url3, body, { headers: head });
  }
  getOrderDetails(fk_order_id: number) {
    return this._http.get(this.url4 + fk_order_id);
  }

}
