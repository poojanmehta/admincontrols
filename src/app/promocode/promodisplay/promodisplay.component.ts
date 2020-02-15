import { Component, OnInit, ViewChild } from '@angular/core';
import { PromodataService } from '../promodata.service';
import { promo } from '../promocode';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-promodisplay',
  templateUrl: './promodisplay.component.html',
  styleUrls: ['./promodisplay.component.css']
})
export class PromodisplayComponent implements OnInit {

  constructor(private _promodata: PromodataService, private _router: Router) { }
  promoArr: promo[];
  displayedColumns: string[] = ['name','min_pur','max_disc','disc_rate','disc_flat','exp_date'];
  dataSource = new MatTableDataSource<promo>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this._promodata.getPromocode().subscribe(
      (data: promo[]) => {
        this.promoArr = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onAdd() {
    this._router.navigate(['/nav/promocode']);
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
