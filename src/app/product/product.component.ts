import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
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
    private _catdata: CategorydataService) { }

  selectedFile: File = null;
  cat: category[] = [];
  p_ben: FormArray;
  benifits: string;
  i: number = 0;
  p_qty: String;
  unit: string[] = ['kilogram',
    'gram',
    'litre',
    'mililiter'];
  productform: FormGroup
  ngOnInit() {
    this.productform = this._fb.group({
      p_name: new FormControl(null, [Validators.required]),
      p_price: new FormControl(null, [Validators.required]),
      p_dis: new FormControl(null, [Validators.required]),
      fk_sct_id: new FormControl(null, [Validators.required]),
      p_qty: new FormControl(null, [Validators.required]),
      p_unit: new FormControl(null, [Validators.required]),
      p_stock: new FormControl(null, [Validators.required]),
      p_ben: this._fb.array([this.newBenifit()]),
      p_usage: new FormControl(null),
      p_img: new FormControl(null),
      new_con: new FormControl(null)
    });
    this._catdata.getSubcategory().subscribe(
      (data: category[]) => {
        this.cat = data;
        console.log(this.cat);
      }
    );
  }
  onAdd() {
    for (let n = 0; n <= this.i; n++) {
      if (n == 0) {
        this.benifits = this.productform.value.p_ben[n].new_ben;
      }
      else {
        this.benifits = this.benifits + '/' + this.productform.value.p_ben[n].new_ben;
        console.log(this.benifits);
      }
    }
    this.p_qty = this.productform.value.p_qty + '/' + this.productform.value.p_unit;
    let fd = new FormData();
    fd.append('p_name', this.productform.value.p_name);
    fd.append('p_price', this.productform.value.p_price);
    fd.append('p_dis', this.productform.value.p_dis);
    fd.append('p_qty', this.productform.value.p_qty);
    fd.append('p_unit', this.productform.value.p_unit);
    fd.append('p_stock', this.productform.value.p_stock);
    fd.append('p_ben', this.benifits);
    fd.append('p_usage', this.productform.value.p_usage);
    if (this.selectedFile != null) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }
    fd.append('fk_sct_id', this.productform.value.fk_sct_id);
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
  newBenifit(): FormGroup {
    return this._fb.group({
      new_ben: new FormControl(null)
    });
  }
  newControl() {
    if (this.i < 5) {
      this.p_ben = this.productform.get('p_ben') as FormArray;
      this.p_ben.push(this.newBenifit());
      this.i++;
    }
    else {
      alert('Only 6 fields ar allowed!');
    }
  }
}
