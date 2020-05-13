import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PurchasedserviceService } from './purchasedservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { purchasedservice } from './purchasedservice';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainerdataserviceService } from '../trainer/trainerdataservice.service';
import { trainer } from '../trainer/trainer';

@Component({
  selector: 'app-purchasedservice',
  templateUrl: './purchasedservice.component.html',
  styleUrls: ['./purchasedservice.component.css']
})
export class PurchasedserviceComponent implements OnInit {

  constructor(private _data: PurchasedserviceService,
    public _dialog: MatDialog, ) { }

  purchasedService: any[] = [];
  dataSource = new MatTableDataSource<purchasedservice>();
  expiry: string = 'grey';
  t_id: number;

  diaplayedColumns: string[] = ['s_name', 'c_name', 'trainer', 'date', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this._data.getAllPurchasedService().subscribe(
      (data: purchasedservice[]) => {
        this.purchasedService = data;
        this.dataSource.data = data;
        console.log(data);
        this.checkDate();
      }
    );
  }

  assign(service) {
    const dialogRef = this._dialog.open(AssigntrainerComponent, {
      data: { t_id: this.t_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.t_id = result;
      console.log(this.t_id)
      if (this.t_id !== undefined) {
        const obj = {
          sp_id: service.sp_id,
          fk_t_id: this.t_id
        };
        this._data.assignTrainer(obj).subscribe(
          (data: any) => {
            console.log(data);
            alert('Trainer assigned successfully');
          }
        );
      }
      else {
        alert('Please select deliveryboy from dialog box');
      }
    });
  }


  checkDate() {

    for (let item of this.purchasedService) {
      let cur_date = new Date();

      this.expiry = 'white';

      let exp_date = new Date(item.sp_exp_date);

      let cur_year = cur_date.getFullYear();
      let exp_year = exp_date.getFullYear();

      let cur_month = cur_date.getMonth();
      let exp_month = exp_date.getMonth();

      let cur_day = cur_date.getDate();
      let exp_day = exp_date.getDate();

      if (cur_year == exp_year) {
        if (cur_month == exp_month) {
          if (cur_day == exp_day) {
            this.expiry = "lightcoral";
          }
        }
      } else {
        if (cur_year > exp_year) {
          this.expiry = 'lightgrey';
        } else {
          if (cur_month > exp_month) {
            this.expiry = 'lightgrey';
          } else {
            if (cur_day > exp_day) {
              this.expiry = 'lightgrey';
            }
          }
        }
      }
      item.expiry = this.expiry;
    }
  }
}

@Component({
  selector: 'assign-trainer-dialog',
  templateUrl: './assigntrainer.html',
  styleUrls: ['./purchasedService.component.css']
})

export class AssigntrainerComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AssigntrainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _trainerdata: TrainerdataserviceService) { }

  trainerArr: trainer[] = [];

  ngOnInit(): void {
    this._trainerdata.getAllTrainer().subscribe(
      (data: trainer[]) => {
        this.trainerArr = data;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
