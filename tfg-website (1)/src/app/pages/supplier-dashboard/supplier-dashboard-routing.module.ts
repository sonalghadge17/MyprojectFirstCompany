import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierDashboardComponent } from './supplier-dashboard.component';
import { SuDashboardComponent } from './su-dashboard/su-dashboard.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import { MyProductComponent } from './my-product/my-product.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SupportComponent } from './support/support.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { RequestedProductSupplierComponent } from './requested-product-supplier/requested-product-supplier.component';

const routes: Routes = [
  {
    path:'', component:SupplierDashboardComponent,
    children: [
      { path: 'dashboard', component: SuDashboardComponent },
      { path: 'my-deals', component:MyDealsComponent  },
      { path: 'myProduct', component:MyProductComponent  },
      { path: 'requested-product-supplier', component:RequestedProductSupplierComponent },
      { path: 'Profile-setting', component:ProfileSettingComponent  },
      { path: 'change-password', component:ChangePasswordComponent  },
      { path: 'support', component:SupportComponent  },
      { path: 'add-product', component:AddNewProductComponent  },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route
    ]
  },
  // {
  //   path:'dashboard', component:SuDashboardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierDashboardRoutingModule { }
