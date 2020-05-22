import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryboyService } from '../deliveryboy.service';
import { dboy } from './deliveryboy';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliveryboy',
  templateUrl: './deliveryboy.component.html',
  styleUrls: ['./deliveryboy.component.css']
})
export class DeliveryboyComponent implements OnInit {

  constructor(private _dboydata: DeliveryboyService,
    private _fb: FormBuilder, private router: Router) { }
  selectedFile: File = null;
  diaplayedColumns: string[] = ['db_id', 'db_name', 'db_gen', 'db_contact', 'db_img', 'action'];
  gender: string[] = ['male', 'female'];
 dataSource = new MatTableDataSource<dboy>();
  dboyform: FormGroup;
   dboyArr: dboy[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // ngOnInit(): void {
  //   this._dboydata.getAllDboy().subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       this.dboyArr = data;
  //       this.dataSource.data = this.dboyArr;
  //     }
  //   );

  ngOnInit() {
    this.dboyform = new FormGroup({
      db_name: new FormControl(null, [Validators.required]),
      db_gen:new FormControl(null,[Validators.required]),
      db_contact: new FormControl(null, [Validators.required]),
      db_img: new FormControl(null, [Validators.required])
    })
  }
  onAdd() {
    console.log(this.dboyform.value.db_name);
    let fd = new FormData();
    fd.append('db_name', this.dboyform.value.db_name);
    fd.append('db_gen', this.dboyform.value.db_gen);
    fd.append('db_contact', this.dboyform.value.db_con);
    if (this.selectedFile != null) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }
    this._dboydata.addDboy(fd).subscribe(
      (data: any[]) => {
        console.log(data);
        alert("added succesfully");
      }
    );

  }
  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }


//   onAdd() {
//     this._dboydata.addDboy(this.dboyform.value).subscribe(
//       (data: any) => {
//         console.log(data);
//         alert('New record added');
//         this.dboyArr.push(data);
//         this.dataSource.data = this.dboyArr;
//       }
//     );
//   }

//   onDelete(item: dboy) {
//     this._dboydata.deleteDboy(item.db_id).subscribe(
//       (data: any) => {
//         console.log(data);
//         alert('Record is deleted');
//         this.dboyArr.splice(this.dboyArr.indexOf(item),1);
//         this.dataSource.data = this.dboyArr;
//       }
//     );
//    }
}
