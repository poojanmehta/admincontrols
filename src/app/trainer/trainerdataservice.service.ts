import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainerdataserviceService {
  private url: string = environment.url + 'trainer/';
  constructor(private _http: HttpClient) { }
  getAllTrainer() {
    return this._http.get(this.url);
  }
  addTrainer(obj: FormData) {
    return this._http.post(this.url, obj);
  }
  deleteTrainer(t_id) {
    return this._http.delete(this.url + t_id)
  }

  getTrainerById(t_id) {
    return this._http.get(this.url + t_id);
  }

updateImage(t_id, obj: FormData) {
    return this._http.put(this.url + t_id, obj);
  }

  updateTrainer(obj) {
    console.log(obj);
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url, body, { headers: head });
  }
}
