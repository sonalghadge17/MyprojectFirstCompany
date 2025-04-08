import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { OurProductList } from 'src/assets/data/our-product';
import { DealNowModalComponent } from '../our-product/deal-now-modal/deal-now-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrl: './buyer-home.component.scss'
})
export class BuyerHomeComponent {
  currentUser:any;
  ourProductList:any[] = [];
  dummyourProductList:any[] = [];
   constructor(private authFakeService:AuthfakeauthenticationService,
               private modalService:NgbModal,
               private router:Router
   ){
    const currentUser = this.authFakeService.currentUserValue
    if(currentUser){
      this.currentUser = currentUser;
    }

   }
   ngOnInit(): void {
    this.ourProductList = OurProductList;
    this.dummyourProductList = OurProductList.map((item:any)=>{
      item.isWishlist = false;
      return item;
    });
    // this.breadCrumbItems = [
    //   // { label: 'Profile' },
    //   { label: 'Products', active: true }
    // ];
  }

   addToWishlist(item:any){
    if(item.isWishlist === false){
      item.isWishlist = true
    }else{
      item.isWishlist = false;
    }
  }
    // when click to deal now button 
    dealNow(item:any){
      const modalRef = this.modalService.open(DealNowModalComponent,{backdrop:"static",centered:true,size:'lg'})
      modalRef.componentInstance.selectedItem = item;
      modalRef.result.then(()=>{}, ()=>{});
    }
  
    viewDetails(item:any){
      this.router.navigate(['/our-product/product-details'], { queryParams:{ itemData: JSON.stringify(item) } });
   
    }
    goToAllProduct(){
      this.router.navigateByUrl('/our-product').then(()=>{
        scrollTo({top:0})
      })
    }

   recentDeals = [
    {
      id:'1',
      name:'Apple',
      imgUrl:'assets/buyer-dashboard/recent-deals/apple.png',
      price:'$ 2290 MT',
      dateTime:'9 Aug 2024  |  12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Just Visited'
    },
    {
      id:'2',
      name:'Banana',
      imgUrl:'assets/buyer-dashboard/recent-deals/banana.png',
      price:'$ 2290 MT',
      dateTime:'9 Aug 2024  |  12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Pending'
    },
    {
      id:'3',
      name:'Muskmelon',
      imgUrl:'assets/buyer-dashboard/recent-deals/muskmelon.png',
      price:'$ 2290 MT',
      dateTime:'9 Aug 2024  |  12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Pending'
    },
  ]
  bestSuppliers = [
    {
      id:'1',
      name:'Ahemad & Co.',
      logoUrl:'assets/supplier_ahemad.png',
      flatUrl:'assets/supplier_pak_flag.png',
      countryName:'Pakistan',
      popularProduct:['Apple','Grapes','Orange'],
    },
    {
      id:'2',
      name:'Manjunatha & Co.',
      logoUrl:'assets/supplier_manjunatha.png',
      flatUrl:'assets/supplier_china_flag.png',
      countryName:'China',
      popularProduct:['Apple','Grapes','Orange'],
    },
    {
      id:'3',
      name:'Naing Shang Pin Food Co.Ltd',
      logoUrl:'assets/supplier_naing_shang.png',
      flatUrl:'assets/supplier_china_flag.png',
      countryName:'China',
      popularProduct:['Apple','Grapes','Orange'],
    },
    {
      id:'4',
      name:'Arvind Fruits & Co.',
      logoUrl:'assets/supplier_arvind.png',
      flatUrl:'assets/supplier_india_flag.png',
      countryName:'India',
      popularProduct:['Apple','Grapes','Orange'],
    },
  ]
  exploreProducts = [
      {
        id:'1',
        name:'Banana',
        imgUrl:'assets/buyer-dashboard/recent-deals/banana.png',
        sellerName:'Arvind Fruits & Co.',
        flatUrl:'assets/supplier_india_flag.png',
        countryName:'India',
        price:'$ 2290 MT',
      },
      {
        id:'2',
        name:'Chicken',
        imgUrl:'assets/product-images/product_chicken.png',
        sellerName:'Ahemad & Co.',
        flatUrl:'assets/supplier_pak_flag.png',
        countryName:'Pakistan',
        price:'$ 2290 MT',
      },
      {
        id:'3',
        name:'Muskmelon',
        imgUrl:'assets/product-images/product_muskmelon.png',
        sellerName:'Arvind Fruits & Co.',
        flatUrl:'assets/supplier_india_flag.png',
        countryName:'India',
        price:'$ 2290 MT',
      },
      {
        id:'4',
        name:'Orange',
        imgUrl:'assets/product-images/orange.png',
        sellerName:'Arvind Fruits & Co.',
        flatUrl:'assets/supplier_india_flag.png',
        countryName:'India',
        price:'$ 2290 MT',
      }
  ]
   
}
