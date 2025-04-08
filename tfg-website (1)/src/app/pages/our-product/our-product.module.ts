import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurProductRoutingModule } from './our-product-routing.module';
import { OurProductComponent } from './our-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DealNowModalComponent } from './deal-now-modal/deal-now-modal.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    OurProductComponent,
    DealNowModalComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    OurProductRoutingModule,
    SharedModule,
    NgbDropdownModule
  ]
})
export class OurProductModule { }
