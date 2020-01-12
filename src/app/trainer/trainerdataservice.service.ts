import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainerdataserviceService {
  private url: string = environment.url + 'trainer/';
  constructor(private _http: HttpClient) {}
  getAllTrainer(){
  return this._http.get(this.url);
  }
  addTrainer(obj){
    const body=JSON.stringify(obj);
    const head=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.url,body,{headers:head});
  }
}
