import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { service } from '../service';

@Component({
  selector: 'app-servicedisplay',
  templateUrl: './servicedisplay.component.html',
  styleUrls: ['./servicedisplay.component.css']
})
export class ServicedisplayComponent implements OnInit {

  constructor(private _router:Router,private _data:ServiceService,private _dialog:MatDialog) { }
    displayedcolumns:string[]=['name','price','dur','disc','ben','action'];
    datasource=new MatTableDataSource<service>();
  ngOnInit(): void {
    this._data.getAllServices().subscribe(
      (data: service[]) => {
        this.datasource.data = data;
      }
    );

  }
  onAdd() {
    this._router.navigate(['/nav/service']);
  }
  onUpdate(row) {
    this._router.navigate(['/nav/serviceupdate', row.s_id]);
  }

  onDelete(row) {
    if (confirm('Are you sure you want to delete the Services?')) {
      this._data.deleteService(row.s_id).subscribe(
        (data: any[]) => {
          console.log(data);
          this.ngOnInit();
        }
      );
    }
  }
}
