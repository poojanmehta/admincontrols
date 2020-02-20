import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorydataService {

  constructor(private _http:HttpClient) { }
  private url:string = environment.url+"category/";
  private url2:string = environment.url+"subcategory/";
  addSubCatgory(obj,ct_id){
    const body=JSON.stringify({sct_name: obj});
    console.log(body);
    const head=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.url2+ct_id,body,{headers:head});
  }
  getCategory(){
    return this._http.get(this.url);
  }
  getSubcategory(){
    return this._http.get(this.url2);
  }
  deletesubcategory(sct_id:number){
    return this._http.delete(this.url+sct_id);
  }
}
