import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryboypageserviceService {

  constructor(private _http: HttpClient) { }
  private url: string = environment.url + "deliverydetail/";
  private url2: string = environment.url + 'ordersassigned/';


  getAllOrders(db_id: number) {
    return this._http.get(this.url + db_id);
  }
  updateStatus(obj: any) {
    console.log(obj);
    const body = JSON.stringify(obj);
    console.log(body);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url2, body, { headers: head });
  }
}
