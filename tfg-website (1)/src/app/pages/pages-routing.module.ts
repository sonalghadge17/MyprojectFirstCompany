import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { HomeComponent } from './home/home.component';
import { OurMissionComponent } from './our-mission/our-mission.component';
import { SellNowComponent } from './sell-now/sell-now.component';
import { CountryProductDetailsComponent } from './home/country-product-details/country-product-details.component';
import { AuthfakeauthenticationService } from '../core/services/authfake.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { SupplierProfileComponent } from './supplier-dashboard/supplier-profile/supplier-profile.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule), canActivate: [AuthGuard] 
  },

  {
    path: "home",
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path:"country-product-details/:countryName",
    component: CountryProductDetailsComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "our-mission",
    component: OurMissionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sell-now",
    component: SellNowComponent,
    canActivate: [AuthGuard]
  },
 
  {
    path:'buyer-dashboard', loadChildren: () => import('./buyer-dashboard/buyer-dashboard.module').then(m => m.BuyerDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path:'supplier-dashboard', loadChildren:()=>import('./supplier-dashboard/supplier-dashboard.module').then(m=>m.SupplierDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path:'our-product',loadChildren:()=> import('./our-product/our-product.module').then(m => m.OurProductModule),
    canActivate: [AuthGuard]
  },
  {
    path:'supplier-profile',component:SupplierProfileComponent
  },
  {
    path:'buyer-home',loadChildren:()=>import('./buyer-home/buyer-home.module').then(m => m.BuyerHomeModule),
    canActivate: [AuthGuard]
  },
  {
    path:'request-new-product',loadComponent:()=>import('./buyer-dashboard/requested-product/request-new-product/request-new-product.component').then(c => c.RequestNewProductComponent),
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
