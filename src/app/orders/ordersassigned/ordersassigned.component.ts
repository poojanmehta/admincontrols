import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdersserviceService } from '../ordersservice.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-ordersassigned',
  templateUrl: './ordersassigned.component.html',
  styleUrls: ['./ordersassigned.component.css']
})
export class OrdersassignedComponent implements OnInit {

  constructor(private _orderdata: OrdersserviceService) { }

  diaplayedColumns: string[] = ['order_id', 'order_date', 'pay_type', 'c_name', 'pro_disc', 'dd_id']
  dataSource = new MatTableDataSource<any>();
  ordersArr: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit(): void {
    this._orderdata.getAllAssignedOrders().subscribe(
      (data: any) => {
        this.dataSource.data = data;
        this.ordersArr = data;
        console.log(data);
      }
    );
  }

  update(order) {
    console.log(order.dd_id);
    if (confirm('Are you sure? you are updating status')) {
      let date = formatDate(new Date(), 'dd/MM/yyyy', 'en');
      const obj = {
        dd_id: order.dd_id,
        completion_date: date

      };
      this._orderdata.updateStatus(obj).subscribe(
        (data: any) => {
          console.log(data);
          alert('Order is complete! Find this order in past orders');
          this.ordersArr.splice(this.ordersArr.indexOf(order), 1);
          this.dataSource.data = this.ordersArr;
        }
      );
    }
  }


}
