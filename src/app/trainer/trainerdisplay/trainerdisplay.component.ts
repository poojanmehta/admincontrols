import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { product } from 'src/app/product/product';
import { TrainerdataserviceService } from '../trainerdataservice.service';
import { SelectionModel } from '@angular/cdk/collections';
import { trainer } from '../trainer';

@Component({
  selector: 'app-trainerdisplay',
  templateUrl: './trainerdisplay.component.html',
  styleUrls: ['./trainerdisplay.component.css']
})
export class TrainerdisplayComponent implements OnInit {

  constructor(private _router: Router, private _data: TrainerdataserviceService, public _dialog: MatDialog) { }
  diaplayedColumns: string[] = ['name', 'gen', 'dob', 'con', 'qlf','exp','action'];
  dataSource = new MatTableDataSource<trainer>();
  selection = new SelectionModel<trainer>(true, []);
  ngOnInit() {
    this._data.getAllTrainer().subscribe(
      (data: trainer[]) => {
        this.dataSource.data = data;
      }
    );
  }
  onAdd() {
    this._router.navigate(['/nav/trainer']);
  }
  // moreInfo(row) {
  //   console.log(row.t_name);
  //   const dialogRef = this._dialog.open(ProductmoreinfoComponent, {
  //     data: { pid: row.p_id }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('dialog is closed');
  //   });
  // }
  onUpdate(row) {
    this._router.navigate(['/nav/trainerupdate', row.t_id]);
  }
  onDelete(row) {
    if (confirm('Are you sure you want to delete the product?')) {
      this._data.deleteTrainer(row.t_id).subscribe(
        (data: any[]) => {
          this.ngOnInit();
        }
      );
    }
  }
}




