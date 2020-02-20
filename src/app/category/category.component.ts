import { Component, OnInit } from '@angular/core';
import { CategorydataService } from '../category/categorydata.service';
import { category } from './category';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private _data: CategorydataService) { }
  diaplayedColumns:string[] = ['name','subcatID','catID','catname'];
  dataSource = new MatTableDataSource<category>();
  ct_id: number;
  cat: category[] = [];
  subcat: category[] = [];
  sct_name: string;
  sct_cat:category[]=[];
  ngOnInit() {
    this._data.getCategory().subscribe(
      (data: category[]) => {
        this.cat = data;
        console.log(data);
      }
    );
    this._data.getSubcategory().subscribe(
      (data: category[]) => {
        this.sct_cat=data;
        //this.dataSource.data = data;
        console.log(data);
        for(let i=0;i<this.sct_cat.length;i++){
          for(let j=0;j<this.cat.length;j++){
            if(this.cat[j].ct_id == this.sct_cat[i].fk_ct_id){
              this.sct_cat[i].ct_name = this.cat[j].ct_name;
            }
          }
        }
        this.dataSource.data = this.sct_cat;
        console.log(this.dataSource.data);
      }
    );


  }
  onAdd() {
    console.log(this.ct_id);
    this._data.addSubCatgory(this.sct_name, this.ct_id).subscribe(
      (data: any) => {
        alert('New Category Added');
        console.log(data);
      }
    );
  }

  onDelete(row)
  {

  }
}
