import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PromodataService } from './promodata.service';

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {

  constructor(private _fb: FormBuilder,
              private _promodata:PromodataService) { }

  promoform: FormGroup;
  type: string[] = ['product', 'service'];

  ngOnInit() {
    this.promoform = this._fb.group({
      pro_name: new FormControl(null, [Validators.required]),
      pro_disc_rate: new FormControl(null),
      pro_disc_flat: new FormControl(null),
      pro_min_pur: new FormControl(null),
      pro_max_disc: new FormControl(0, [Validators.required]),
      pro_pur_type: new FormControl(null, [Validators.required]),
      pro_exp_date: new FormControl(null)
    })
  }

  onPromoAdd() {
    this._promodata.addPromocode(this.promoform.value).subscribe(
      (data:any[]) => {
        console.log(data);
      }
    );
  }
}
