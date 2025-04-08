import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerDashboardComponent } from './buyer-dashboard.component';
import { BuDashboardComponent } from './bu-dashboard/bu-dashboard.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import { FevouriteSuppliersComponent } from './fevourite-suppliers/fevourite-suppliers.component';
import { FevouriteProductsComponent } from './fevourite-products/fevourite-products.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SupportComponent } from './support/support.component';
import { LogoutComponent } from './logout/logout.component';
import { RequestedProductComponent } from './requested-product/requested-product.component';

const routes: Routes = [
  {
    path:'',component:BuyerDashboardComponent,
    children: [
      { path: 'dashboard', component: BuDashboardComponent },
      { path: 'my-deals', component:MyDealsComponent  },
      { path: 'fevourite-suppliers', component:FevouriteSuppliersComponent  },
      { path: 'fevourite-products', component:FevouriteProductsComponent  },
      { path: 'requested-products', component:RequestedProductComponent},
      { path: 'account-setting', component:AccountSettingComponent  },
      { path: 'change-password', component:ChangePasswordComponent  },
      { path: 'support', component:SupportComponent  },
      { path: 'logout', component:LogoutComponent  },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerDashboardRoutingModule { }
