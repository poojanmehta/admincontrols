import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignupDataService {
  // getsignup(value: (value: any) => void) {
  //   throw new Error("Method not implemented.");
  // }
  // value(value: any) {
  //   throw new Error("Method not implemented.");
  // }
   private url:string= environment.url+"signup/";
   private cust_url:string=environment.url+"customer/";
  constructor(private _http:HttpClient) { }
  onsignup(obj)
  {
    console.log(obj);
    const body =JSON.stringify(obj);
    const head=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.url,body,{headers:head});
  }
  get(obj){
    let body=JSON.stringify(obj);
    let head1=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.cust_url,body,{headers:head1});
  }
}
