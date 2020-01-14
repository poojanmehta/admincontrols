import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductdataService } from './productdata.service';
import { category } from '../category/category';
import { CategorydataService } from '../category/categorydata.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _productdata: ProductdataService,
              private _fb: FormBuilder,
              private _catdata:CategorydataService) { }

  selectedFile: File = null;
  cat: category[] = [];
  productform: FormGroup
  ngOnInit() {
    this.productform = new FormGroup({
      p_name: new FormControl(null, [Validators.required]),
      p_price: new FormControl(null, [Validators.required]),
      p_dis: new FormControl(null, [Validators.required]),
      fk_sct_id: new FormControl(null, [Validators.required]),
      p_qty: new FormControl(null, [Validators.required]),
      p_stock: new FormControl(null, [Validators.required]),
      p_img: new FormControl(null)
    });
    this._catdata.getSubcategory().subscribe(
      (data: category[]) => {
        console.log(data);
        this.cat=data;
      }
    )
  }
  onAdd() {
    // console.log("inAdd");
    let fd = new FormData();
    fd.append('p_name', this.productform.value.p_name);
    fd.append('p_price', this.productform.value.p_price);
    fd.append('p_dis', this.productform.value.p_dis);
    fd.append('p_qty', this.productform.value.p_qty);
    fd.append('p_stock', this.productform.value.p_stock);
    if (this.selectedFile != null) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }
    fd.append('fk_sct_id',this.productform.value.fk_sct_id);

    this._productdata.addProduct(fd).subscribe(
      (data: any[]) => {
        console.log(data);
        console.log(this.productform.value);
      }
    );
  }
  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }
  newControl() {
    this.productform.addControl('img', new FormControl('', Validators.required));
  }
}
