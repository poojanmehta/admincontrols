import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductdataService } from '../productdata.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { product } from '../product';

@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.css']
})
export class ProductupdateComponent implements OnInit {
  updateform:FormGroup;
  p_id:number;
  constructor(private _router:Router,
              private _act:ActivatedRoute,
              private _data:ProductdataService) { }

  ngOnInit() {
    this.p_id = this._act.snapshot.params['p_id'];
    this.updateform = new FormGroup({
      p_name: new FormControl(null,[Validators.required]),
      p_price: new FormControl(null,[Validators.required]),
      p_qty: new FormControl(null,[Validators.required]),
      p_stock: new FormControl(null,[Validators.required]),
      p_dis: new FormControl(null,[Validators.required])
    });
    this._data.getProductById(this.p_id).subscribe(
      (data:product[]) => {
        this.formDataBind(data[0]);
      }
    );
  }
  formDataBind(data2: product){
    this.updateform.patchValue({
      p_name: data2.p_name,
      p_price: data2.p_price,
      p_qty: data2.p_qty,
      p_stock: data2.p_stock,
      p_dis: data2.p_dis
    });
  }
  onUpdate(){
    this._data.updateProduct(this.updateform.value).subscribe(
      (data: any[]) => {
        this._router.navigate(['/nav/product']);
      }
    )
  }
}
