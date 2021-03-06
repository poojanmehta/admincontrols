import { Component, OnInit, ViewChild } from '@angular/core';
import { HomepageofferService } from '../homepageoffer.service';
import { Form, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { product } from '../product/product';
import { productCarousel } from './productcarousel';
import { ProductadddialogComponent } from './productadddialog/productadddialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductmoreinfoComponent } from '../product/productmoreinfo/productmoreinfo.component';
import { homepageoffers } from './homepage-offer';

@Component({
  selector: 'app-homepage-offer',
  templateUrl: './homepage-offer.component.html',
  styleUrls: ['./homepage-offer.component.css']
})
export class HomepageOfferComponent implements OnInit {
  offerform: FormGroup
  selectedfile: File;
  constructor(private _homepage: HomepageofferService,
    private fb: FormBuilder, public _dialog: MatDialog, private _router: Router) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  productsArr: product[] = [];
  productIDArr: number[] = [];
  offerArr: homepageoffers[] = [];
  diaplayedColumns: string[] = ['img', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<product>();


  ngOnInit(): void {
    this.offerform = this.fb.group({
      offer_img: new FormControl(null, [Validators.required]),
      offer_link: new FormControl(null, [Validators.required]),
      offer_discription: new FormControl(null, [Validators.required])
    })
    this._homepage.getAllOffers().subscribe(
      (data: homepageoffers[]) => {
        console.log(data);
        this.offerArr = data;
      }
    );
    this._homepage.getAllProducts().subscribe(
      (data: productCarousel[]) => {
        const arr = data;
        console.log(arr);
        for (const item of data) {
          this.productIDArr.push(item.fk_p_id);
        }
      }, (err) => {
        console.log(err);
      }, () => {
        console.log(this.productIDArr);
        this._homepage.getMultipleProducts(this.productIDArr).subscribe(
          (data: product[]) => {
            this.productsArr = data;
            this.dataSource.data = this.productsArr;
            console.log(data);
          }
        );
      }
    );
  }

  addProducts() {
    let productAddArr: number[] = [];
    const dialogRef = this._dialog.open(ProductadddialogComponent, {
      // height: '500px',
      width: '500px',
      data: { productAddArr: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == undefined) {
        alert('Select atleast 1 product');
      } else {
        for (const id of result) {
          const obj = {
            fk_p_id: id
          };
          this._homepage.addProductsToCarousel(obj).subscribe(
            (data: any) => {
              console.log(data);
              if (data.errno == 1062) {
                alert('Duplicate entry for product is not allowed');
              }
              this.productIDArr.push(id);
              console.log(this.productIDArr);
            }, (err) => {
              console.log(err);
            }, () => {
              this._homepage.getMultipleProducts(this.productIDArr).subscribe(
                (data: product[]) => {
                  this.productsArr = data;
                  this.dataSource.data = this.productsArr;
                  console.log(data);
                }
              );
            }
          );
        }
      }
    }
    );
  }
  onadd() {
    console.log(this.offerform.value.t_name);
    let fd = new FormData();
    fd.append('offer_link', this.offerform.value.offer_link);
    fd.append('offer_discription', this.offerform.value.offer_discription);
    if (this.selectedfile != null) {
      fd.append('image', this.selectedfile, this.selectedfile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }

  };

  onChange(f) {
    this.selectedfile = <File>f.target.files[0];
  }
  onAddOffer() {
    let fd = new FormData();
    fd.append('offer_link', this.offerform.value.offer_link);
    fd.append('offer_discription', this.offerform.value.offer_discription);

    if (this.selectedfile != null) {
      fd.append('image', this.selectedfile, this.selectedfile.name);
    }
    else {
      fd.append('image', new Blob(), null);
    }
    this._homepage.addOffers(fd).subscribe(
      (data: any[]) => {
        console.log(data);
        this.offerArr = data;
      }
    );
  }
  moreInfo(row) {
    const dialogRef = this._dialog.open(ProductmoreinfoComponent, {
      data: { pid: row.p_id }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdate(row) {
    this._router.navigate(['/nav/productupdate', row.p_id]);
  }
  onDelete(row) {
    const obj = {
      fk_p_id: row.p_id
    };
    if (confirm('Are you sure you want to remove the product?')) {
      this._homepage.deleteProductFromCarousel(obj).subscribe(
        (data: any[]) => {
          console.log(data);
          this.productsArr.splice(this.productsArr.indexOf(row), 1);
          this.dataSource.data = this.productsArr;
        }
      );
    }
  }
}
