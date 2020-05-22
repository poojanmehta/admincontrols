import { Component, OnInit } from '@angular/core';
import { OrdersserviceService } from '../orders/ordersservice.service';
import { ActivatedRoute } from '@angular/router';
import { order } from '../orders/order';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor(private _orderdetail: OrdersserviceService,
    private _activateroute: ActivatedRoute) { }

  ngOnInit(): void {

    let order_id: number = this._activateroute.snapshot.params['order_id'];

    this._orderdetail.getOrderDetails(order_id).subscribe(
      (data:order)=>{
        console.log(data);
      }
    );
  }

}
