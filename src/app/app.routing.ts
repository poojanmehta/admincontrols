import { Routes, RouterModule } from "@angular/router";
import { ClientloginComponent } from './clientlogin/clientlogin.component';
import { ProductComponent } from './product/product.component';
import { ClientsignupComponent } from './clientsignup/clientsignup.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthguardService } from './authguard.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductdisplayComponent } from './product/productdisplay/productdisplay.component';
import { ProductupdateComponent } from './product/productupdate/productupdate.component';
import { CategoryComponent } from './category/category.component';
import { TrainerComponent } from './trainer/trainer.component';
import { TrainerdisplayComponent } from './trainer/trainerdisplay/trainerdisplay.component';
import { TrainerupdateComponent } from './trainer/trainerupdate/trainerupdate.component';
import { EmailsenderComponent } from './emailsender/emailsender.component';
import { PromocodeComponent } from './promocode/promocode.component';
import { PromodisplayComponent } from './promocode/promodisplay/promodisplay.component';
import { ServiceComponent } from './service/service.component';
import { ServicedisplayComponent } from './service/servicedisplay/servicedisplay.component';
import { ServiceupdateComponent } from './service/serviceupdate/serviceupdate.component';
import { ServiceimagesComponent } from './serviceimages/serviceimages.component';

const arr: Routes = [

  { path: '', component: ClientloginComponent },
  {
    path: 'nav', canActivate: [AuthguardService], component: MainNavComponent, children: [
      { path: 'product', component: ProductdisplayComponent },
      { path: 'signup', component: ClientsignupComponent },
      { path: 'userinfo', component: UserInfoComponent },
      { path: 'productadd', component: ProductComponent },
      { path: 'productupdate/:p_id', component: ProductupdateComponent },
      { path: 'category', component: CategoryComponent },
      { path:'trainer',component:TrainerComponent},
      {path:'trainerdisplay',component:TrainerdisplayComponent},
      {path:'trainerupdate/:t_id',component:TrainerupdateComponent},
      {path:'email',component:EmailsenderComponent},
      {path:'promocode',component:PromocodeComponent},
      {path:'promodisplay',component:PromodisplayComponent},
      {path:'service',component:ServiceComponent},
      {path:'servicedisplay',component:ServicedisplayComponent},
      {path:'serviceupdate/:s_id',component:ServiceupdateComponent},
      {path:'serviceimages',component:ServiceimagesComponent}
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

export const routingArr = RouterModule.forRoot(arr);
