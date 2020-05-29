import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryboyService {

  constructor(private _http: HttpClient) { }
  private url: string = environment.url + "deliveryboy/";

  addDboy(item: FormData) {
    const body = JSON.stringify(item);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url, body, { headers: head });
  }
  deleteDboy(db_id: number) {
    return this._http.delete(this.url + db_id);
  }
  getAllDboy() {
    return this._http.get(this.url);
  }
  getAllDataById(db_id: number) {
    return this._http.get(this.url + db_id);
  }
  checkDboyLogin(obj: any) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url + 'login', body, { headers: head });
  }
}

