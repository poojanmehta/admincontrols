import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductdataService } from '../productdata.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _productdata:ProductdataService) { }
productform: FormGroup
  ngOnInit() {
    this.productform = new FormGroup({
      p_name:new FormControl(null,[Validators.required]),
      p_price:new FormControl(null,[Validators.required]),
      p_dis:new FormControl(null,[Validators.required]),
      p_qty:new FormControl(null,[Validators.required]),
      p_stock:new FormControl(null,[Validators.required])
    })
  }
  onAdd(){
    console.log("inAdd");
    this._productdata.addProduct(this.productform.value).subscribe(
      (data:any[]) => {
        console.log(data);
      }
    );
  }
}
