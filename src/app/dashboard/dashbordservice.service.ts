import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashbordserviceService {
  private url: string = environment.url + "dashbord/";
 constructor(private _http:HttpClient) { }
 orderBySubCategory(){
   return this._http.get(this.url);
 }
}
