import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientloginComponent } from './clientlogin/clientlogin.component';
import { AssigntrainerComponent } from './purchasedservice/purchasedservice.component';
//import statement
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { routingArr } from './app.routing';
import { ProductComponent } from './product/product.component';
import { ClientsignupComponent } from './clientsignup/clientsignup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductdisplayComponent } from './product/productdisplay/productdisplay.component';
import { ProductmoreinfoComponent } from './product/productmoreinfo/productmoreinfo.component';
import { ProductupdateComponent } from './product/productupdate/productupdate.component';
import { CategoryComponent } from './category/category.component';
import { TrainerComponent } from './trainer/trainer.component';
import { TrainerdisplayComponent } from './trainer/trainerdisplay/trainerdisplay.component';
import { TrainerupdateComponent } from './trainer/trainerupdate/trainerupdate.component';
import { AddpromodialogComponent } from './product/addpromodialog/addpromodialog.component';
import { EmailsenderComponent } from './emailsender/emailsender.component';
import { trainermoreinfocomponent } from './trainer/trainermoreinfo/trainermoreinfo.component';
import { PromocodeComponent } from './promocode/promocode.component';
import { PromodisplayComponent } from './promocode/promodisplay/promodisplay.component';
import { ServiceComponent } from './service/service.component';
import { ServicedisplayComponent } from './service/servicedisplay/servicedisplay.component';
import { ServiceupdateComponent } from './service/serviceupdate/serviceupdate.component';
import { ServiceimagesComponent } from './serviceimages/serviceimages.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { OrdersComponent } from './orders/orders.component';
import { OrdersassignedComponent } from './orders/ordersassigned/ordersassigned.component';
import { OrdersnotassignedComponent } from './orders/ordersnotassigned/ordersnotassigned.component';
import { OrderspastComponent } from './orders/orderspast/orderspast.component';
import { DeliveryboyComponent } from './deliveryboy/deliveryboy.component';
import { AssigndboydialogComponent } from "./orders/ordersnotassigned/ordersnotassigned.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { PurchasedserviceComponent } from './purchasedservice/purchasedservice.component';





@NgModule({
  declarations: [
    AppComponent,
    ClientloginComponent,
    MainNavComponent,
    ProductComponent,
    ClientsignupComponent,
    PagenotfoundComponent,
    UserInfoComponent,
    ProductdisplayComponent,
    ProductmoreinfoComponent,
    trainermoreinfocomponent,
    ProductupdateComponent,
    CategoryComponent,
    TrainerComponent,
    TrainerdisplayComponent,
    TrainerupdateComponent,
    AddpromodialogComponent,
    EmailsenderComponent,
    PromocodeComponent,
    PromodisplayComponent,
    ServiceComponent,
    ServicedisplayComponent,
    ServiceupdateComponent,
    ServiceimagesComponent,
    OrdersComponent,
    OrdersassignedComponent,
    OrdersnotassignedComponent,
    OrderspastComponent,
    DeliveryboyComponent,
    AssigndboydialogComponent,
    DashboardComponent,
    OrderdetailsComponent,
    PurchasedserviceComponent,
    AssigntrainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routingArr,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCarouselModule.forRoot(),
    MatGridListModule,
    MatMenuModule,

  ],
  providers: [],
  entryComponents: [
    ProductmoreinfoComponent,
    AddpromodialogComponent,
    trainermoreinfocomponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
