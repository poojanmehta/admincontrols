import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductdataService {
private url:string= environment.url+"product/";
  constructor(private _http:HttpClient) { }
  addProduct(obj){
    console.log(obj);
    const body=JSON.stringify(obj);
    const head=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.url,body,{headers:head});
  }
  getAllProduct(){
    return this._http.get(this.url);
  }
  getProductById(p_id){
    return this._http.get(this.url+p_id);
  }
}
