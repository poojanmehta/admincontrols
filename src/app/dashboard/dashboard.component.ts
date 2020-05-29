import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashbordserviceService } from './dashbordservice.service';

class donutCategoryChart {
  constructor(public kind: string, public share: number,
  ) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartBySubCategory: donutCategoryChart[] = [];
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         // { title: 'Card 3', cols: 1, rows: 1 },
  //         // { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       // { title: 'Card 3', cols: 1, rows: 2 },
  //       // { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver,
    private _dashboard: DashbordserviceService) { }

  ngOnInit(): void {
    this._dashboard.orderBySubCategory().subscribe(
      (data: any[]) => {

        console.log(data);
        // this.chartBySubCategory = data;
        for (const item of data) {
          this.chartBySubCategory.push(
            new donutCategoryChart(
              item.fk_sct_id,
              item.p_name
            )
          );
        }
      }
    )
  }
}
