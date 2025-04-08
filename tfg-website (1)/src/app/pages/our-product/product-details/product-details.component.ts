import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DealNowModalComponent } from '../deal-now-modal/deal-now-modal.component';
import { ProductDetailsInfo } from 'src/app/core/enums/enum';
import { RelatedProductList } from 'src/assets/data/related-products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  breadCrumbItems!: Array<{}>;
  productDetails: any;
  selectedOption:string = '';
  option = ProductDetailsInfo
  ourProductList:any[] = [];
  productInfo = [
    {
      id:1,
      key :'Supplier Name',
      value:'Naing Shang pin food co.Ltd'
    },
    {
      id:2,
      key :'Supplier No',
      value:'352'
    },
    {
      id:3,
      key :'Category',
      value:'Fruits & Vegetables'
    },
    {
      id:4,
      key :'Traceable',
      value:'Yes'
    },
    {
      id:5,
      key :'ISO9001',
      value:'Yes'
    },
   
    
  ]
  productInfo_2= [
    {
      id:6,
      key :'Company Category',
      value:'Private Enterprises'
    },
    {
      id:7,
      key :'Address',
      value:'Food industrial zone, newly librated area, gaojia town...'
    },
    {
      id:8,
      key :'Export',
      value:'No'
    },
    {
      id:9,
      key :'Global Gap',
      value:'No'
    },
  ]
  constructor(private router: ActivatedRoute,
              private modalService:NgbModal,
              private routers:Router
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((res: any) => {
      console.log('Received Item:', res);
      console.log('Received Itemeee:', JSON.parse(res.itemData));
      this.productDetails = JSON.parse(res.itemData);
    });
    this.ourProductList = RelatedProductList.map((item:any)=>{
      item.isWishlist = false;
      return item;
    });;
    if (this.productDetails) {
      this.breadCrumbItems = [
        { label: 'Suppliers' },
        { label: this.productDetails.companyName },
        { label: this.productDetails.name, active: true }
      ];
    }

    this.selectedOption = this.option.PRODUCT_INFO

  }

  addToWishlist(item:any){
    if(item.isWishlist === false){
      item.isWishlist = true
    }else{
      item.isWishlist = false;
    }
  }

  dealNow(item:any){
    const modalRef = this.modalService.open(DealNowModalComponent,{backdrop:"static",centered:true,size:'lg'})
    modalRef.componentInstance.selectedItem = item;
    modalRef.result.then(()=>{}, ()=>{});
  }
  viewDetails(item:any){
    this.routers.navigate(['/our-product/product-details'], { queryParams:{ itemData: JSON.stringify(item) } }).then(()=>{
      scrollTo({top:0})
    });
    
  }

  isActiveTab(btnVal:string):boolean{
    return btnVal === this.selectedOption;
  }
  onSelectBtn(btnVal:string){
    this.selectedOption = btnVal;
  }
}
