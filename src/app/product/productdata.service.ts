import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductdataService {
  constructor(private _http:HttpClient) { }
  private url:string= environment.url+"product/";
  addProduct(obj:FormData){
    return this._http.post(this.url,obj);
  }
  getAllProduct(){
    return this._http.get(this.url);
  }
  getProductById(p_id){
    return this._http.get(this.url+p_id);
  }
  updateProduct(obj){
    const body=JSON.stringify(obj);
    console.log(body);
    const head=new HttpHeaders().set(environment.header,environment.value);
    return this._http.put(this.url,body,{headers:head});
  }
  deleteProduct(p_id){
    return this._http.delete(this.url+p_id)
  }
  updateImage(p_id,obj:FormData){
    return this._http.put(this.url+p_id,obj);
  }
}
