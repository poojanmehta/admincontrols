import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagedataserviceService {
  url: string = environment.url + "image/";

  constructor(private _http: HttpClient) { }
  addImage(item: FormData) {
    return this._http.post(this.url, item);
  }

  getImage() {
    return this._http.get(this.url);
  }

  deleteImage(img_id: number) {
    return this._http.delete(this.url + img_id);

  }
}
