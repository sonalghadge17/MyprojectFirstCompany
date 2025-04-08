import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BuyerDashboardRoutingModule } from './buyer-dashboard-routing.module';
import { BuyerDashboardComponent } from './buyer-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuDashboardComponent } from './bu-dashboard/bu-dashboard.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import { FevouriteSuppliersComponent } from './fevourite-suppliers/fevourite-suppliers.component';
import { FevouriteProductsComponent } from './fevourite-products/fevourite-products.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SupportComponent } from './support/support.component';
import { LogoutComponent } from './logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestedProductComponent } from './requested-product/requested-product.component';


@NgModule({
  declarations: [
    BuyerDashboardComponent,
    BuDashboardComponent,
    MyDealsComponent,
    FevouriteSuppliersComponent,
    FevouriteProductsComponent,
    AccountSettingComponent,
    ChangePasswordComponent,
    SupportComponent,
    LogoutComponent,
    RequestedProductComponent
  ],
  imports: [
    CommonModule,
    BuyerDashboardRoutingModule,
    SharedModule,
    NgbModule,
    NgOptimizedImage
  ]
})
export class BuyerDashboardModule { }
