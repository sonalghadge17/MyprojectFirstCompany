import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurProductComponent } from './our-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path:'',component:OurProductComponent
  },
  {
    path:'product-details',component:ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurProductRoutingModule { }
