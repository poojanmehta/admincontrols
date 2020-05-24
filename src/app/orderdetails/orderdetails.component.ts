import { Component, OnInit } from '@angular/core';
import { OrdersserviceService } from '../orders/ordersservice.service';
import { ActivatedRoute } from '@angular/router';
import { order } from '../orders/order';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor(private _orderdetail: OrdersserviceService,
    private _activateroute: ActivatedRoute) { }

    orderdetails:any[]=[];
    diaplayedColumns: string[] = ['img', 'name', 'qty', 'price', 'total'];
    dataSource = new MatTableDataSource<any>();

    ngOnInit(): void {

    let order_id: number = this._activateroute.snapshot.params['order_id'];

    this._orderdetail.getOrderDetails(order_id).subscribe(
      (data:any[])=>{
        this.orderdetails=data;
        console.log(data);
        this.dataSource.data=this.orderdetails;
      }
    );
  }

}
