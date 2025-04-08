import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerHomeComponent } from './buyer-home.component';

const routes: Routes = [
  {
    path:'',component:BuyerHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerHomeRoutingModule { }
