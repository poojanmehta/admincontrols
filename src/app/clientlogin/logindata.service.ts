import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  private url: string = 'http://localhost:3000/client/';
  constructor(private _http:HttpClient) { }

  getlogin(item) {
    console.log(item)
    let body = JSON.stringify(item);
    let x = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url, body, { headers: x });
  }
}
