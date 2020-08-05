import { Component, OnInit } from '@angular/core';
import { ServicepurchaseDetailService } from '../servicepurchaseDetail/servicepurchase-detail.service';
import { ActivatedRoute } from '@angular/router';
import { trainer } from '../trainer/trainer';
import { TrainerdataserviceService } from '../trainer/trainerdataservice.service';

@Component({
  selector: 'app-servicepurchase-detail',
  templateUrl: './servicepurchase-detail.component.html',
  styleUrls: ['./servicepurchase-detail.component.css']
})
export class ServicepurchaseDetailComponent implements OnInit {
  sp_id: number;
  servicepurchase: any;
  trainerdetail: trainer;
  constructor(private _servicepurchasedata: ServicepurchaseDetailService,
    private _activate: ActivatedRoute,
    private _trainer: TrainerdataserviceService) { }

  ngOnInit(): void {
    this.sp_id = this._activate.snapshot.params['sp_id'];
    let obj = {
      sp_id: this.sp_id
    }
    this._servicepurchasedata.getPurchasedServiceByID(obj).subscribe(
      (data: any[]) => {
        console.log(data);
        this.servicepurchase = data[0];
      }
      , (err) => {
        console.log(err);
      }, () => {
        this._trainer.getTrainerById(this.servicepurchase.fk_t_id).subscribe(
          (data: any[]) => {
            console.log(data);
            this.trainerdetail = data[0];
          }
        )
      }
    );
  }

}
