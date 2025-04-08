import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerHomeRoutingModule } from './buyer-home-routing.module';
import { BuyerHomeComponent } from './buyer-home.component';


@NgModule({
  declarations: [
    BuyerHomeComponent
  ],
  imports: [
    CommonModule,
    BuyerHomeRoutingModule
  ],
  exports:[
    BuyerHomeComponent
  ]
})
export class BuyerHomeModule { }
