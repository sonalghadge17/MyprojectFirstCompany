import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewPaymentComponent } from './view-payment/view-payment.component';


@NgModule({
  declarations: [
    PaymentComponent,
    AddPaymentComponent,
    ViewPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,ReactiveFormsModule,NgxPaginationModule,NgSelectModule
  ]
})
export class PaymentModule { }
