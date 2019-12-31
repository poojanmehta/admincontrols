import { Routes, RouterModule } from "@angular/router";
import { ClientloginComponent } from './clientlogin/clientlogin.component';
import { ProductComponent } from './product/product.component';
import { ClientsignupComponent } from './clientsignup/clientsignup.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthguardService } from './authguard.service';

const arr: Routes = [

  { path: '', component: ClientloginComponent },
  {
    path: 'nav',canActivate:[AuthguardService], component: MainNavComponent, children: [
      { path: 'product', component: ProductComponent },
      { path: 'signup', component: ClientsignupComponent }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

export const routingArr = RouterModule.forRoot(arr);
