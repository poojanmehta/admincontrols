import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { product } from '../product';
import { ProductdataService } from 'src/app/product/productdata.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductmoreinfoComponent } from '../productmoreinfo/productmoreinfo.component';

import { MatPaginator, MatSort } from '@angular/material';

import { AddpromodialogComponent } from '../addpromodialog/addpromodialog.component';


@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css']
})
export class ProductdisplayComponent implements OnInit {

  constructor(private _router: Router, private _data: ProductdataService, public _dialog: MatDialog) { }
  diaplayedColumns: string[] = ['check', 'name', 'price', 'quantity', 'stock', 'category' , 'action'];
  dataSource = new MatTableDataSource<product>();
  checkarr: number[] = [];
  product_tbl: product[];
  promo: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;




  ngOnInit() {
    this._data.getAllProduct().subscribe(
      (data: product[]) => {
        this.product_tbl = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  onCheckBoxChange(row: product) {

    if (this.checkarr.find(x => x == row.p_id)) {
      this.checkarr.splice(this.checkarr.indexOf(row.p_id), 1);
    }
    else {
      this.checkarr.push(row.p_id);
    }

  }
  onAdd() {
    this._router.navigate(['/nav/productadd']);
  }
  moreInfo(row) {
    const dialogRef = this._dialog.open(ProductmoreinfoComponent, {
      data: { pid: row.p_id }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdate(row) {
    this._router.navigate(['/nav/productupdate', row.p_id]);
  }
  onDelete(row) {
    if (confirm('Are you sure you want to delete the product?')) {
      this._data.deleteProduct(row.p_id).subscribe(
        (data: any[]) => {
          this.ngOnInit();
        }
      );
    }
  }
  onDeleteAllClick() {
    if (confirm('Are you sure to delete multiple products?')) {
      this._data.deleteAllProduct(this.checkarr).subscribe(
        (data) => {
          for (let i = 0; i < this.checkarr.length; i++) {
            let x = this.product_tbl.find(x => x.p_id == this.checkarr[i]);
            this.product_tbl.splice(this.product_tbl.indexOf(x), 1);
          }
          this.dataSource.data = this.product_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
    }
  }
  onAddPromocode() {
    const dialogRef = this._dialog.open(AddpromodialogComponent, {
      data: { promo: this.promo }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.promo = result;
      if(this.promo != undefined){
      let obj = {
        chkarr: this.checkarr,
        promo: this.promo
      }
      this._data.addPromo(obj).subscribe(
        (data: any) => {
          alert('Promocode Added Succsessfully');
        }
      );
      }
    });
  }
}

