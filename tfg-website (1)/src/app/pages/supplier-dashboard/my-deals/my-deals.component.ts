import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CounterOffersComponent } from './counter-offers/counter-offers.component';
import { CancelModelComponent } from './cancel-model/cancel-model.component';
import { AcceptDealModalComponent } from '../../buyer-dashboard/my-deals/accept-deal-modal/accept-deal-modal.component';

@Component({
  selector: 'app-my-deals',
  templateUrl: './my-deals.component.html',
  styleUrl: './my-deals.component.scss'
})
export class MyDealsComponent implements OnInit{
  imgUrlApple:string | null | ArrayBuffer ='assets/product_apple.png'
  imgUrl:string | null | ArrayBuffer ='assets/product_orange.png'

   data =     {
    id:'2',
      name:'Apple',
      imgUrl:'assets/product_apple.png',
      price:'$ 2290 MT',
      dateTime:'01 Aug 2024   |    12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'In Process',
      companyName:'Naing Shang Pin Food Co.Ltd',
      twitterBlueTagUrl:'assets/Twitter_Verified_Badge.png',
      flagUrl:'assets/supplier_india_flag.png',
      suppCountry:'INDIA',
      isSuppResponse:true,
  }
  constructor( private modalService: NgbModal,){}

  ngOnInit(): void {
    
  }

   acceptDeal(item:any){
      const modalRef = this.modalService.open(AcceptDealModalComponent,{centered:true,size:'lg'})
      modalRef.componentInstance.item = item;
      modalRef.result.then(()=>{}, ()=>{})
    }
  
  dataListAll = [

    {
      id:'2',
      name:'Apple',
      price:'$ 2290 MT',
      dateTime:'01 Aug 2024   |    12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'In Process',
      companyName:'Naing Shang Pin Food Co.Ltd',
      twitterBlueTagUrl:'assets/Twitter_Verified_Badge.png',
      flagUrl:'assets/supplier_india_flag.png',
      suppCountry:'INDIA',
      isSuppResponse:true,
      comments:'Hey akshay i requested to change the price kindly please check and and give me the confirmation so we can proceed further'

    },
   
  ]

  generateQR(){
    
  }

  offerModel(){
    const modalRef = this.modalService.open(CounterOffersComponent, { size: 'lg', centered: true });
   
  }

  cancelOffer(){
    const modalRef = this.modalService.open(CancelModelComponent, { size: 'md', centered: true });
  }

}
