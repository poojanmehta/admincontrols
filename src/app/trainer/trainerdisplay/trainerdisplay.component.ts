import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TrainerdataserviceService } from '../trainerdataservice.service';
// import { SelectionModel } from '@angular/cdk/collections';
import { trainer } from '../trainer';
import { trainermoreinfocomponent } from '../trainermoreinfo/trainermoreinfo.component';


@Component({
  selector: 'app-trainerdisplay',
  templateUrl: './trainerdisplay.component.html',
  styleUrls: ['./trainerdisplay.component.css']
})
export class TrainerdisplayComponent implements OnInit {

  constructor(private _router: Router, private _data: TrainerdataserviceService, public _dialog: MatDialog) { }
  diaplayedColumns: string[] = ['name', 'gen', 'dob', 'con', 'qlf','exp','action'];
  dataSource = new MatTableDataSource<trainer>();
  // selection = new SelectionModel<trainer>(true, []);
  ngOnInit() {
    this._data.getAllTrainer().subscribe(
      (data: trainer[]) => {
        this.dataSource.data = data;
      }
    );
  }
  onAdd() {
    this._router.navigate(['/nav/trainer']);
  }
   moreInfo(row) {
    console.log(row.t_id);
    const dialogRef = this._dialog.open(trainermoreinfocomponent, {
      data: { tid: row.t_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog is closed');
    });
  }
  onUpdate(row) {
    this._router.navigate(['/nav/trainerupdate', row.t_id]);
  }
  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(row) {
    if (confirm('Are you sure you want to delete the product?')) {
      this._data.deleteTrainer(row.t_id).subscribe(
        (data: any[]) => {
          this.ngOnInit();
        }
      );
    }
  }
}




