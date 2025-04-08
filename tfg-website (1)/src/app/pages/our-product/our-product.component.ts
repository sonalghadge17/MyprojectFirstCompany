import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OurProductList } from 'src/assets/data/our-product';
import { DealNowModalComponent } from './deal-now-modal/deal-now-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-product',
  templateUrl: './our-product.component.html',
  styleUrl: './our-product.component.scss'
})
export class OurProductComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  ourProductList:any[] = [];
  dummyourProductList:any[] = [];
  isDropdownOpen = false;


  constructor(private modalService:NgbModal,
              private router:Router
  ){

  }
  ngOnInit(): void {
    this.ourProductList = OurProductList;
    this.dummyourProductList = OurProductList.map((item:any)=>{
      item.isWishlist = false;
      return item;
    });
    this.breadCrumbItems = [
      // { label: 'Profile' },
      { label: 'Products', active: true }
    ];

    window.scrollTo({top:0})
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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



  onSearch(event:any){
   const searchedData = event.target.value.toLowerCase();
   if(searchedData == ''){
    this.ourProductList = this.dummyourProductList;
   }else{
    this.ourProductList = this.dummyourProductList.filter((item:any)=>{
      return item.name.toLowerCase().includes(searchedData) || item.companyName.toLowerCase().includes(searchedData)|| item.suppCountry.toLowerCase().includes(searchedData)
    })
   }
  }


}
