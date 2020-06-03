import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashbordserviceService } from './dashbordservice.service';
import { product } from '../product/product';
import { CategorydataService } from '../category/categorydata.service';
import { category } from '../category/category';

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
  productData: product[] = [];
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        // { title: 'Card 3', cols: 1, rows: 2 },
        // { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private _dashboard: DashbordserviceService,
    private _catdata: CategorydataService) { }

  categoryCount: number[] = [];
  categoryData: category[] = [];

  ngOnInit(): void {

    this._catdata.getSubcategory().subscribe(
      (data: any[]) => {
        this.categoryData = data;
        console.log(this.categoryData);
        for (let i = 0; i < data.length; i++) {
          this.categoryCount[i] = 0;
        }
      }
    )

    this._dashboard.orderBySubCategory().subscribe(
      (data: any[]) => {

        console.log(data);
        this.productData = data;
        // this.chartBySubCategory = data;
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < this.categoryData.length; j++) {
            if (this.productData[i].fk_sct_id == this.categoryData[j].sct_id) {
              this.categoryCount[j] += 1;
            }
            console.log(i, j);
          }
        }

        for (const cat3 of this.categoryCount) {
          console.log(cat3);
        }


        for (let i = 0; i < this.categoryData.length; i++) {
          this.chartBySubCategory.push(
            new donutCategoryChart(
              this.categoryData[i].sct_name,
              this.categoryCount[i]
            )
          );

        }

        console.log(this.chartBySubCategory);
      }
    );
  }
  public labelContent(e: any): string {
    console.log(e, e.category);
    return e.category;
  }
  public labelCount(e: any): string {
    console.log(e.dataItem.share.toString());
    return e.dataItem.share.toString();
  }
}
