import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trainer } from '../trainer';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainerdataserviceService } from '../trainerdataservice.service';

@Component({
  selector: 'app-trainerupdate',
  templateUrl: './trainerupdate.component.html',
  styleUrls: ['./trainerupdate.component.css']
})
export class TrainerupdateComponent implements OnInit {
  updateform:FormGroup;
  t_id: number;
  data2: trainer;
  new_img: File;
  fd = new FormData();
  constructor(private _router: Router,
    private _act: ActivatedRoute,
    private _data: TrainerdataserviceService) { }

  ngOnInit() {
    this.t_id = this._act.snapshot.params['t_id'];
    this.updateform = new FormGroup({
      t_id: new FormControl(),
      t_name: new FormControl(null, [Validators.required]),
      t_gen: new FormControl(null, [Validators.required]),
      t_dob: new FormControl(null, [Validators.required]),
      t_con: new FormControl(null, [Validators.required]),
      t_qlf: new FormControl(null, [Validators.required]),
      t_exp: new FormControl(null, [Validators.required])
     });
    this._data.getTrainerById(this.t_id).subscribe(
      (data: trainer[]) => {
        console.log(data);
        this.data2 = data[0];
        this.formDataBind();
      }
    );
  }
  formDataBind() {
    this.updateform.patchValue({
      t_id:this.data2.t_id,
      t_name: this.data2.t_name,
      t_gen: this.data2.t_gen,
      t_dob: this.data2.t_dob,
      t_con: this.data2.t_con,
      t_qlf: this.data2.t_qlf,
      t_exp:this.data2.t_exp
    });
  }
  onUpdate() {
    this._data.updateTrainer(this.updateform.value).subscribe(
      (data: any[]) => {
        console.log(data)
        this._router.navigate(['/nav/trainerdisplay']);
      }
    );
  }
   changeImage(f) {
     this.new_img = <File>f.target.files[0];
     this.fd.append('image',this.new_img,this.new_img.name);
   }
    updateImage(){
     this._data.updateImage(this.data2.t_id,this.fd).subscribe(
       (data:any) => {
         console.log('image updated');
       }
    );
 }
}




