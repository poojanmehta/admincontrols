import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { order } from '../order';
import { OrdersserviceService } from '../ordersservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderspast',
  templateUrl: './orderspast.component.html',
  styleUrls: ['./orderspast.component.css']
})
export class OrderspastComponent implements OnInit {

  constructor(private orderdata: OrdersserviceService,
    private _router:Router) { }

  diaplayedColumns: string[] = ['order_id','order_date','pay_type','c_name','pro_disc','Action']
  dataSource = new MatTableDataSource<any>();
  ordersArr: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit(): void {
    this.orderdata.getAllOrders().subscribe(
      (data : any) => {
        this.dataSource.data = data;
        this.ordersArr = data;
        console.log(data);
      }
    );
  }
  onDetails(item){
    this._router.navigate(['nav/orderdetails',item.order_id]);
  }
}
