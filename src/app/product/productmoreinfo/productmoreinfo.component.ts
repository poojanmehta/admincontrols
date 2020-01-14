import { Component, OnInit, inject, Inject } from '@angular/core';
import { ProductdataService } from '../productdata.service';
import { product } from '../product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-productmoreinfo',
  templateUrl: './productmoreinfo.component.html',
  styleUrls: ['./productmoreinfo.component.css']
})
export class ProductmoreinfoComponent implements OnInit {

  constructor(private _data:ProductdataService,
              public dialogRef: MatDialogRef<ProductmoreinfoComponent>,
              @Inject(MAT_DIALOG_DATA) public info) { }
  data:product;
  ngOnInit() {
    this._data.getProductById(this.info.pid).subscribe(
      (data2: product[]) => {
        this.data=data2[0];
      }
    );
  }

}
