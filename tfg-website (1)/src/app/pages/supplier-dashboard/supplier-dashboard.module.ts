import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { SupplierDashboardRoutingModule } from './supplier-dashboard-routing.module';
import { SupplierDashboardComponent } from './supplier-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuDashboardComponent } from './su-dashboard/su-dashboard.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import { MyProductComponent } from './my-product/my-product.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SupportComponent } from './support/support.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { CounterOffersComponent } from './my-deals/counter-offers/counter-offers.component';
import { CancelModelComponent } from './my-deals/cancel-model/cancel-model.component';
import { RequestedProductSupplierComponent } from './requested-product-supplier/requested-product-supplier.component';


@NgModule({
  declarations: [
    SupplierDashboardComponent,
    SuDashboardComponent,
    MyDealsComponent,
    MyProductComponent,
    ProfileSettingComponent,
    ChangePasswordComponent,
    SupportComponent,
    AddNewProductComponent,
    CounterOffersComponent,
    CancelModelComponent,
    RequestedProductSupplierComponent,
  ],
  imports: [
    CommonModule,
    SupplierDashboardRoutingModule,
    SharedModule,
    NgOptimizedImage
  ],
  exports:[
    SupplierDashboardComponent,
    
  ]
})
export class SupplierDashboardModule { }
