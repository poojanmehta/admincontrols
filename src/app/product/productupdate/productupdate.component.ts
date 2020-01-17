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
  updateform: FormGroup;
  p_id: number;
  data2: product;
  new_img: File;
  fd = new FormData();
  constructor(private _router: Router,
    private _act: ActivatedRoute,
    private _data: ProductdataService) { }

  ngOnInit() {
    this.p_id = this._act.snapshot.params['p_id'];
    this.updateform = new FormGroup({
      p_name: new FormControl(null, [Validators.required]),
      p_price: new FormControl(null, [Validators.required]),
      p_qty: new FormControl(null, [Validators.required]),
      p_stock: new FormControl(null, [Validators.required]),
      p_dis: new FormControl(null, [Validators.required])
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
      p_name: this.data2.p_name,
      p_price: this.data2.p_price,
      p_qty: this.data2.p_qty,
      p_stock: this.data2.p_stock,
      p_dis: this.data2.p_dis
    });
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
    this.fd.append('image',this.new_img,this.new_img.name);
  }
  updateImage(){
    this._data.updateImage(this.data2.p_id,this.fd).subscribe(
      (data:any) => {
        console.log('image updated');
      }
    );
  }
}
