import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchasedserviceService } from '../purchasedservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { purchasedservice } from './purchasedservice';

@Component({
  selector: 'app-purchasedservice',
  templateUrl: './purchasedservice.component.html',
  styleUrls: ['./purchasedservice.component.css']
})
export class PurchasedserviceComponent implements OnInit {

  constructor(private _data: PurchasedserviceService) { }

  purchasedService: any[] = [];
  dataSource = new MatTableDataSource<purchasedservice>();
  expiry: string = 'grey';

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

  assign(item) {

  }

  checkDate() {

    for (let item of this.purchasedService) {
      let cur_date = new Date();

      this.expiry = "lightgrey";

      let exp_date = new Date(item.sp_exp_date);

      let cur_year = cur_date.getFullYear();
      let exp_year = exp_date.getFullYear();

      let cur_month = cur_date.getMonth();
      let exp_month = exp_date.getMonth();

      let cur_day = cur_date.getDate();
      let exp_day = exp_date.getDate();

      if (cur_year == exp_year) {
        console.log('first if')
        if (cur_month == exp_month) {
          if (cur_day == exp_day) {
            this.expiry = "lightcoral";
          }
        }
      } else if (cur_year > exp_year) {
        console.log('second if')
        if (cur_month > exp_month) {
          if (cur_day > exp_day) {
            this.expiry = 'white';
          }
          this.expiry = 'white';
        }
      }
      item.expiry = this.expiry;
    }
  }
}
