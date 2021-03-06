import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { product } from '../product';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductmoreinfoComponent } from '../productmoreinfo/productmoreinfo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddpromodialogComponent } from '../addpromodialog/addpromodialog.component';
import { CategorydataService } from 'src/app/category/categorydata.service';
import { category } from 'src/app/category/category';
import { ProductdataService } from '../productdata.service';


@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css'],
})
export class ProductdisplayComponent implements OnInit {

  constructor(private _router: Router, private _data: ProductdataService, public _dialog: MatDialog,
    private _catdata: CategorydataService) { }


  diaplayedColumns: string[] = ['check', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<product>();
  checkarr: number[] = [];
  product_tbl: product[];
  temparr: product[];
  priceArr: product[] = [];
  discount: number;
  cat: category[] = [];
  selectedcat: number = -1;
  discbox: boolean = false;
  //const priceobj[]: Array<{ id: number, price: number }> = [];


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
    this._catdata.getSubcategory().subscribe(
      (data: category[]) => {
        this.cat = data;
      }
    );
  }
  onCheckBoxChange(row: product) {

    if (this.checkarr.find(x => x == row.p_id)) {
      this.checkarr.splice(this.checkarr.indexOf(row.p_id), 1);
      this.priceArr.splice(this.priceArr.indexOf(row), 1);
    } else {
      this.checkarr.push(row.p_id);
      this.priceArr.push(row);
    }
    console.log(this.checkarr);
  }

  onCategoryChange() {
    this.checkarr = [];
    if (this.selectedcat == -1) {
      this.dataSource.data = this.product_tbl;
    } else {
      this.temparr = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.product_tbl.length; i++) {
        if (this.selectedcat == this.product_tbl[i].fk_sct_id) {
          this.temparr.push(this.product_tbl[i]);
        }
      }
      this.dataSource.data = this.temparr;
    }
  }


  onDiscountBox() {
    this.discbox = !this.discbox;
    this.checkarr = [];
    if (this.discbox == true) {
      this.temparr = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.product_tbl.length; i++) {
        if (this.product_tbl[i].p_disc != null) {
          this.temparr.push(this.product_tbl[i]);
        }
      }
      this.diaplayedColumns.push('discount');
      this.diaplayedColumns.push('disc_price');
      this.dataSource.data = this.temparr;
      this.selectedcat = -1;
    } else {
      this.diaplayedColumns.pop();
      this.diaplayedColumns.pop();
      this.dataSource.data = this.product_tbl;
    }
    console.log(this.discbox);
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
          this.product_tbl.splice(this.product_tbl.indexOf(row), 1);
          this.dataSource.data = this.product_tbl;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
  onDeleteDiscount() {
    if (confirm('Are you sure you want to delete Promocodes?')) {
      this._data.deletePromo(this.checkarr).subscribe(
        (data: any) => {
          if (confirm('Discounts deleted sucsessfully')) {
            this.ngOnInit();
            this.discbox = false;
            this.diaplayedColumns.pop();
            this.diaplayedColumns.pop();
            this.checkarr.length = 0;
            console.log(data);
          }
        }
      );
    }
  }

  onAddDiscount() {
    const dialogRef = this._dialog.open(AddpromodialogComponent, {
      data: { discount: this.discount }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.discount = result;
      if (this.discount != undefined) {
        for (let i = 0; i < this.checkarr.length; i++) {
          let discprice = (this.priceArr[i].p_price) - ((this.priceArr[i].p_price * this.discount) / 100);
          let obj2 = {
            id: this.checkarr[i],
            disc_price: discprice,
            disc: this.discount

          };
          console.log(obj2);

          this._data.addDiscount(obj2).subscribe(
            (data: any) => {
              console.log(data);
            }
          );
        }
        alert('added');
        this.ngOnInit();
        this.checkarr.length = 0;
      }
    });
  }
}

