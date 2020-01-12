import { Component, OnInit } from '@angular/core';
import { TrainerdataserviceService } from './trainerdataservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trainer } from './trainer';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})

export class TrainerComponent implements OnInit {
  constructor(private _trainerdata:TrainerdataserviceService) { }
  gender:string[]=['male','female'];
  trainerform:FormGroup
  ngOnInit() {
    this.trainerform=new FormGroup({
      t_name:new FormControl(null,[Validators.required]),
      t_gen: new FormControl(null),
      t_dob:new FormControl(null),
      t_con:new FormControl(null),
      t_qlf:new FormControl(),
      t_exp:new FormControl(null)
    })

  }
  onadd(){
    this._trainerdata.addTrainer(this.trainerform.value).subscribe(
      (data:trainer[])=>{
        console.log(data);
        alert("added");
      }
    )
  }


}
