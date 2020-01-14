import { Component, OnInit } from '@angular/core';
import { CategorydataService } from '../category/categorydata.service';
import { category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private _data: CategorydataService) { }
  ct_id:number;
  cat: category[] = [];
  sct_name: string;
  ngOnInit() {
    this._data.getCategory().subscribe(
      (data: category[]) => {
        this.cat=data;
      }
    );
  }
  onAdd() {
    console.log(this.ct_id);
    this._data.addCatgory(this.sct_name,this.ct_id).subscribe(
      (data: any) => {
        alert('New Category Added');
      }
    )
  }
}
