import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdersserviceService } from '../ordersservice.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryboyService } from 'src/app/deliveryboy.service';
import { dboy } from 'src/app/deliveryboy/deliveryboy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersnotassigned',
  templateUrl: './ordersnotassigned.component.html',
  styleUrls: ['./ordersnotassigned.component.css']
})
export class OrdersnotassignedComponent implements OnInit {



  constructor(private orderdata: OrdersserviceService,
    public _dialog: MatDialog,
    private _orderdata: OrdersserviceService,
    private _router:Router) { }

  diaplayedColumns: string[] = ['order_id', 'order_date', 'pay_type', 'c_name', 'pro_disc', 'Action']
  dataSource = new MatTableDataSource<any>();
  ordersArr: any[] = [];
  db_id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit(): void {
    this.orderdata.getAllNotAssignedOrders().subscribe(
      (data: any) => {
        this.dataSource.data = data;
        this.ordersArr = data;
        console.log(data);
      }
    );
  }
  onDetails(item){
    this._router.navigate(['nav/orderdetails',item.order_id]);
  }

  assign(order) {
    const dialogRef = this._dialog.open(AssigndboydialogComponent, {
      data: { db_id: this.db_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.db_id = result;
      if (this.db_id !== undefined) {
        const obj = {
          dd_id: order.dd_id,
          db_id: this.db_id
        };
        this._orderdata.assignDeliveryboy(obj).subscribe(
          (data: any) => {
            console.log(data);
            alert('Deliveryboy assigned successfully');
            const mailObj = {
              message: 'Hello your Order is Shipped Order ID : ',
              receiver: localStorage.getItem('c_email')
            };
            const mailObjTOdboy = {
              message: ' you have new Order to be Shipped Please Check Details in Website Order ID : ',
              receiver: localStorage.getItem('c_email')
            };
            this._orderdata.sendShipmentMailDboy(mailObjTOdboy).subscribe(
              (data:any[])=>{
                console.log(data);
              }
            )

            this._orderdata.sendShipmentMailClient(mailObj).subscribe(
              (data:any[])=>{
                console.log(data);
              }
            )

            this.ordersArr.splice(this.ordersArr.indexOf(order), 1);
            this.dataSource.data = this.ordersArr;
          }
        );
      }
      else{
        alert('Please select deliveryboy from dialog box');
      }
    });
  }



}

@Component({
  selector: 'assign-dboy-dialog',
  templateUrl: './assigndboydialog.html',
  styleUrls: ['./ordersnotassigned.component.css']
})

export class AssigndboydialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AssigndboydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _dboydata: DeliveryboyService) { }

  dboyArr: dboy[] = [];

  ngOnInit(): void {
    this._dboydata.getAllDboy().subscribe(
      (data: dboy[]) => {
        this.dboyArr = data;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
