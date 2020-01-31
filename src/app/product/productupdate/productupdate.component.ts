import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductdataService } from '../productdata.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { product } from '../product';
import { CategorydataService } from 'src/app/category/categorydata.service';
import { category } from 'src/app/category/category';

@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.css']
})
export class ProductupdateComponent implements OnInit {
  updateform: FormGroup;
  p_id: number;
  data2: product;
  new_img: File;
  fd = new FormData();
  cat: category[] = []
  unit: string[] = ['kilogram',
    'gram',
    'litre',
    'mililiter'];

  constructor(private _router: Router,
    private _act: ActivatedRoute,
    private _data: ProductdataService,
    private _catdata: CategorydataService) { }

  ngOnInit() {
    this.p_id = this._act.snapshot.params['p_id'];
    this.updateform = new FormGroup({
      p_id: new FormControl(),
      p_name: new FormControl(null, [Validators.required]),
      p_price: new FormControl(null, [Validators.required]),
      fk_sct_id: new FormControl(null),
      p_qty: new FormControl(null, [Validators.required]),
      p_stock: new FormControl(null),
      p_dis: new FormControl(null, [Validators.required]),
      p_unit: new FormControl(null),
      p_usage: new FormControl(null)
    });
    this._data.getProductById(this.p_id).subscribe(
      (data: product[]) => {
        this.data2 = data[0];
        this.formDataBind();
      }
    );
  }
  formDataBind() {
    this.updateform.patchValue({
      p_id: this.data2.p_id,
      p_name: this.data2.p_name,
      fk_sct_id: this.data2.fk_sct_id,
      p_price: this.data2.p_price,
      p_qty: this.data2.p_qty,
      p_stock: this.data2.p_stock,
      p_dis: this.data2.p_dis,
      p_unit: this.data2.p_unit,
      p_usage: this.data2.p_usage,
    });
    this._catdata.getSubcategory().subscribe(
      (data: category[]) => {
        this.cat = data;
        console.log(this.cat);
      }
    );

  }
  onUpdate() {
    this._data.updateProduct(this.updateform.value).subscribe(
      (data: any[]) => {
        this._router.navigate(['/nav/product']);
      }
    );
  }
  changeImage(f) {
    this.new_img = <File>f.target.files[0];
    this.fd.append('image', this.new_img, this.new_img.name);
  }
  updateImage() {
    console.log(this.new_img);
    this._data.updateImage(this.data2.p_id, this.fd).subscribe(
      (data: any) => {
        console.log('image updated');
      }
    );
  }
}
