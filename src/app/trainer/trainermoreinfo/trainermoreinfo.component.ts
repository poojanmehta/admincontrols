import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrainerdataserviceService } from '../trainerdataservice.service';
import { trainer } from '../trainer';
import { environment  } from "../../../environments/environment";
@Component({
  selector: 'app-trainermoreinfo',
  templateUrl: './trainermoreinfo.component.html',
  styleUrls: ['./trainermoreinfo.component.css']
})
export class trainermoreinfocomponent implements OnInit {
  constructor(private _data: TrainerdataserviceService, public dialogRef: MatDialogRef<trainermoreinfocomponent>,
    @Inject(MAT_DIALOG_DATA)
    public info) { }

    data: trainer;
    TrainerImgPath: string;
    ImagePath: string = environment.url +"images/trainer_images/" ;

  ngOnInit() {
    this._data.getTrainerById(this.info.tid).subscribe((data2: trainer[]) => {
      this.data = data2[0];
    });
  }
}
