import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OurProductList } from 'src/assets/data/our-product';

@Component({
  selector: 'app-supplier-profile',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './supplier-profile.component.html',
  styleUrl: './supplier-profile.component.scss'
})
export class SupplierProfileComponent {
  breadCrumbItems!: Array<{}>;
  ourProductList:any[] = [];
  dummyourProductList:any[] = [];


    ngOnInit(): void {
      this.breadCrumbItems = [
        // { label: 'Profile' },
        { label: 'Supplier Profile', active: true }
      ];
       this.ourProductList = OurProductList;
          this.dummyourProductList = OurProductList.map((item:any)=>{
            item.isWishlist = false;
            return item;
          });
      window.scrollTo({top:0})
    }

    addToWishlist(item:any){
      if(item.isWishlist === false){
        item.isWishlist = true
      }else{
        item.isWishlist = false;
      }
    }
}
