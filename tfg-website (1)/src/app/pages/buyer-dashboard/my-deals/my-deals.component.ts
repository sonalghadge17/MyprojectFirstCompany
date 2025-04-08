import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuyerDashboard } from 'src/app/core/enums/enum';
import { CancelConfirmModalComponent } from './cancel-confirm-modal/cancel-confirm-modal.component';
import { CounterOffersComponent } from '../../supplier-dashboard/my-deals/counter-offers/counter-offers.component';
import { AcceptDealModalComponent } from './accept-deal-modal/accept-deal-modal.component';
import { DealAcceptedModalComponent } from '../../our-product/deal-now-modal/deal-accepted-modal/deal-accepted-modal.component';

@Component({
  selector: 'app-my-deals',
  templateUrl: './my-deals.component.html',
  styleUrl: './my-deals.component.scss'
})
export class MyDealsComponent {
  currentDate!: string | null;
  selectedOption:string = '';
  option = BuyerDashboard;
  private modalService = inject(NgbModal)
  
  dataListAll = [
    {
      id:'1',
      name:'Orange',
      imgUrl:'assets/product_orange.png',
      price:'$ 2290 MT',
      dateTime:'01 Aug 2024   |    12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Waiting Confirmation from Supplier',
      companyName:'Naing Shang Pin Food Co.Ltd',
      twitterBlueTagUrl:'assets/Twitter_Verified_Badge.png',
      flagUrl:'assets/supplier_india_flag.png',
      suppCountry:'INDIA',
      isSuppResponse:false
    },
    {
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
      comments:'Hey akshay i requested to change the price kindly please check and and give me the confirmation so we can proceed further'

    },
    {
      id:'3',
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
      isSuppResponse:false
 
    },
 
  ]
  dataListCompleted = [
   
    {
      id:'1',
      name:'Apple',
      imgUrl:'assets/product_apple.png',
      price:'$ 2290 MT',
      dateTime:'01 Aug 2024   |    12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Completed',
      companyName:'Naing Shang Pin Food Co.Ltd',
      twitterBlueTagUrl:'assets/Twitter_Verified_Badge.png',
      flagUrl:'assets/supplier_india_flag.png',
      suppCountry:'INDIA',
      isSuppResponse:false,
      comments:null
    },
    {
      id:'2',
      name:'Apple',
      imgUrl:'assets/product_apple.png',
      price:'$ 2290 MT',
      dateTime:'01 Aug 2024   |    12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Completed',
      companyName:'Naing Shang Pin Food Co.Ltd',
      twitterBlueTagUrl:'assets/Twitter_Verified_Badge.png',
      flagUrl:'assets/supplier_india_flag.png',
      suppCountry:'INDIA',
      isSuppResponse:false,
      comments:null

    },
    {
      id:'3',
      name:'Apple',
      imgUrl:'assets/product_apple.png',
      price:'$ 2290 MT',
      dateTime:'01 Aug 2024   |    12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Completed',
      companyName:'Naing Shang Pin Food Co.Ltd',
      twitterBlueTagUrl:'assets/Twitter_Verified_Badge.png',
      flagUrl:'assets/supplier_india_flag.png',
      suppCountry:'INDIA',
      isSuppResponse:false,
      comments:null

    }
   
 
  ]
  dataListInProcess = [
    {
      id:'1',
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
      comments:'Hey akshay i requested to change the price kindly please check and and give me the confirmation so we can proceed further'

    },
    {
      id:'1',
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
      comments:'Hey akshay i requested to change the price kindly please check and and give me the confirmation so we can proceed further'

    },
  
 
  ]
  dataListRejected = [
    {
      id:'1',
      name:'Apple',
      imgUrl:'assets/product_apple.png',
      price:'$ 2290 MT',
      dateTime:'01 Aug 2024   |    12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Rejected',
      companyName:'Naing Shang Pin Food Co.Ltd',
      twitterBlueTagUrl:'assets/Twitter_Verified_Badge.png',
      flagUrl:'assets/supplier_india_flag.png',
      suppCountry:'INDIA',
      isSuppResponse:true,
      comments:'Hey akshay i rejected  this deal  due to pricing related issue'

    },
 
  ]
  constructor(private datePipe:DatePipe){

  }
  ngOnInit(): void {
    this.selectedOption = this.option.ALL;
    const date = new Date()
    this.currentDate = this.datePipe.transform(date,'yyyy-MM-dd');
  }

  isActiveTab(btnVal:string):boolean{
    return btnVal === this.selectedOption;
  }

  onDateSelect(date:any){
  }

  onSelectBtn(btnVal:string){
    this.selectedOption = btnVal;
  }

  cancelDeal(item:any){
     const modalRef = this.modalService.open(CancelConfirmModalComponent,{centered:true})
     modalRef.result.then(()=>{
      debugger
      const indexIs = this.dataListAll.findIndex(item2 => item2.id === item.id)
        this.dataListAll.splice(indexIs,1);
     }, ()=>{})
  }

  acceptDeal(item:any){
    const modalRef = this.modalService.open(DealAcceptedModalComponent,{centered:true,size:'lg'})
    modalRef.componentInstance.item = item;
    modalRef.result.then(()=>{}, ()=>{})
  }

  
  offerModel(){
    const modalRef = this.modalService.open(CounterOffersComponent, { size: 'lg', centered: true });
   
  }

}
