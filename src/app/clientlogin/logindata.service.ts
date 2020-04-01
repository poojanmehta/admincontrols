import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  private url: string = environment.url + 'client/';
  constructor(private _http:HttpClient) { }

  getlogin(item) {
    console.log(item)
    let body = JSON.stringify(item);
    let x = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url, body, { headers: x });
  }
  getAllUser()
  {
    return this._http.get(this.url);
  }
}
