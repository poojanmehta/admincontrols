import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryboyService } from '../deliveryboy.service';
import { dboy } from './deliveryboy';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-deliveryboy',
  templateUrl: './deliveryboy.component.html',
  styleUrls: ['./deliveryboy.component.css']
})
export class DeliveryboyComponent implements OnInit {

  constructor(private _dboydata: DeliveryboyService,
    private _fb: FormBuilder) { }

  diaplayedColumns: string[] = ['db_id', 'db_name', 'db_contact', 'email', 'action'];
  dataSource = new MatTableDataSource<dboy>();
  dboyform: FormGroup;
  dboyArr: dboy[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this._dboydata.getAllDboy().subscribe(
      (data: any) => {
        console.log(data);
        this.dboyArr = data;
        this.dataSource.data = this.dboyArr;
      }
    );
    this.dboyform = this._fb.group({
      db_name: new FormControl(null, [Validators.required]),
      db_contact: new FormControl(null, [Validators.required]),
      db_email: new FormControl(null, [Validators.email, Validators.required])
    });
  }

  onAdd() {
    this._dboydata.addDboy(this.dboyform.value).subscribe(
      (data: any) => {
        console.log(data);
        alert('New record added');
        this.dboyArr.push(data);
        this.dataSource.data = this.dboyArr;
      }
    );
  }

  onDelete(item: dboy) {
    this._dboydata.deleteDboy(item.db_id).subscribe(
      (data: any) => {
        console.log(data);
        alert('Record is deleted');
        this.dboyArr.splice(this.dboyArr.indexOf(item), 1);
        this.dataSource.data = this.dboyArr;
      }
    );
  }
}
