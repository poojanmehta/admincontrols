import { Component, OnInit, Inject } from '@angular/core';
import { ProductdataService } from 'src/app/product/productdata.service';
import { product } from 'src/app/product/product';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-productadddialog',
  templateUrl: './productadddialog.component.html',
  styleUrls: ['./productadddialog.component.css']
})
export class ProductadddialogComponent implements OnInit {

  diaplayedColumns: string[] = ['check', 'img', 'name'];
  dataSource = new MatTableDataSource<product>();
  checkarr: number[] = [];
  product_tbl: product[];

  constructor(private _data: ProductdataService,
    public dialogRef: MatDialogRef<ProductadddialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    this._data.getAllProduct().subscribe(
      (data: product[]) => {
        this.product_tbl = data;
        this.dataSource.data = data;
      }
    );
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCheckBoxChange(row: product) {
    if (this.checkarr.find(x => x == row.p_id)) {
      this.checkarr.splice(this.checkarr.indexOf(row.p_id), 1);
    } else {
      this.checkarr.push(row.p_id);
    }
    console.log(this.checkarr);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
