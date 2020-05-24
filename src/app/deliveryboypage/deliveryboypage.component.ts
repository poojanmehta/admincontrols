import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryboypageserviceService } from './deliveryboypageservice.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-deliveryboypage',
  templateUrl: './deliveryboypage.component.html',
  styleUrls: ['./deliveryboypage.component.css']
})
export class DeliveryboypageComponent implements OnInit {

  constructor(private _actroute: ActivatedRoute,
    private _dbdata: DeliveryboypageserviceService) { }

  orders: any[] = [];
  noOrders:boolean;

  ngOnInit(): void {
    let db_id: number = this._actroute.snapshot.params['db_id'];
    this._dbdata.getAllOrders(db_id).subscribe(
      (data: any[]) => {
        this.orders = data;
        console.log(data);
        if(this.orders.length == 0) {
          this.noOrders = true;
        }
      }
    );
  }

  updateStatus(item) {
    if (confirm('Are you sure? you are updating status')) {
      let date = formatDate(new Date(), 'dd/MM/yyyy', 'en');
      console.log(item.dd_id);
      let obj = {
        dd_id: item.dd_id,
        completion_date: date
      };
      this._dbdata.updateStatus(obj).subscribe(
        (data: any) => {
          console.log(data);
          this.orders.splice(this.orders.indexOf(item), 1);
        }
      );
    }
  }
}

// let date = formatDate(new Date(), 'dd/MM/yyyy', 'en');

