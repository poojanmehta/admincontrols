import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http: HttpClient) { }
  private url: string = environment.url + "service/";
  private url2: string = environment.url + "image/";
  getAllServices() {
    return this._http.get
      (this.url);
  }
  addService(obj: FormData) {
    return this._http.post(this.url, obj);
  }
  getServiceByID(s_id) {
    return this._http.get(this.url + s_id);
  }
  deleteService(s_id) {
    return this._http.delete(this.url + s_id);
  }
  updateService(obj) {
    const body = JSON.stringify(obj);
    console.log(body);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url, body, { headers: head });
  }
  updateCoverImg(obj: FormData, s_id: number) {
    return this._http.put(this.url2 + s_id, obj);
  }
}
