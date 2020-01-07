import { Routes, RouterModule } from "@angular/router";
import { ClientloginComponent } from './clientlogin/clientlogin.component';
import { ProductComponent } from './product/product.component';
import { ClientsignupComponent } from './clientsignup/clientsignup.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthguardService } from './authguard.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductdisplayComponent } from './product/productdisplay/productdisplay.component';

const arr: Routes = [

  { path: '', component: ClientloginComponent },
  {
    path: 'nav', canActivate: [AuthguardService], component: MainNavComponent, children: [
      { path: 'product', component: ProductdisplayComponent },
      { path: 'signup', component: ClientsignupComponent },
      { path: 'userinfo', component: UserInfoComponent },
      { path: 'productadd', component: ProductComponent }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

export const routingArr = RouterModule.forRoot(arr);
