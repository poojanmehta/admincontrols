import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { client } from "../clientlogin/login";
import { LogindataService } from '../clientlogin/logindata.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private _data: LogindataService) {
  }
  displayedColumns: String[] = ['name', 'email', 'contact', 'dob'];
  dataSource = new MatTableDataSource<client>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this._data.getAllUser().subscribe(
      (data:client[]) => {
        this.dataSource.data=data;
      }
    );
    this.dataSource.paginator = this.paginator;
  }

}
