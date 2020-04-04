import { Component, OnInit } from '@angular/core';
import { TrainerdataserviceService } from './trainerdataservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trainer } from './trainer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})

export class TrainerComponent implements OnInit {
  constructor(private _trainerdata: TrainerdataserviceService,
    private _router:Router  ) { }
  selectedFile: File = null;
  gender: string[] = ['male', 'female'];
  trainerform: FormGroup
  ngOnInit() {
    this.trainerform = new FormGroup({
      t_name: new FormControl(null, [Validators.required,]),
      t_gen: new FormControl(null, [Validators.required]),
      t_dob: new FormControl(null, [Validators.required]),
      t_con: new FormControl(null, [Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]),
      t_qlf: new FormControl(null,[Validators.required]),
      t_img: new FormControl(null),
      t_exp: new FormControl(null)
    })

  }
  onadd() {
    console.log(this.trainerform.value.t_name);
    let fd = new FormData();
    fd.append('t_name', this.trainerform.value.t_name);
    fd.append('t_gen', this.trainerform.value.t_gen);
    fd.append('t_dob', this.trainerform.value.t_dob);
    fd.append('t_con', this.trainerform.value.t_con);
    fd.append('t_qlf', this.trainerform.value.t_qlf);
    if (this.selectedFile != null) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }
    fd.append('t_exp', this.trainerform.value.t_exp);

    this._trainerdata.addTrainer(fd).subscribe(
      (data: any[]) => {
        console.log(data);
        alert("added succesfully");
      }
    );

  }
  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }


}
