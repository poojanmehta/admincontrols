import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { product } from '../product';
import { ProductdataService } from 'src/app/product/productdata.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductmoreinfoComponent } from '../productmoreinfo/productmoreinfo.component';


@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css']
})
export class ProductdisplayComponent implements OnInit {

  constructor(private _router: Router,
              private _data: ProductdataService,
              public _dialog:MatDialog) { }
  diaplayedColumns: string[] = ['name', 'price', 'quantity', 'stock', 'action'];
  dataSource = new MatTableDataSource<product>();
  selection = new SelectionModel<product>(true, []);
  ngOnInit() {
    this._data.getAllProduct().subscribe(
      (data: product[]) => {
        this.dataSource.data = data;
      }
    );
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.p_name + 1}`;
  }
  onAdd() {
    this._router.navigate(['/nav/productadd']);
  }
  moreInfo(row) {
    console.log(row.p_name);
    const dialogRef= this._dialog.open(ProductmoreinfoComponent, {
      data:{pid :row.p_id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog is closed');
    });
  }
  onUpdate(row){
    this._router.navigate(['/nav/productupdate', row.p_id]);
  }
  onDelete(row){
    this._data.deleteProduct(row.p_id).subscribe(
      (data: any[]) => {
        this.ngOnInit();
      }
    )
  }
}
