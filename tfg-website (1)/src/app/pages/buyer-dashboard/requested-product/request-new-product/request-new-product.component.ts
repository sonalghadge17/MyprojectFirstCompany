import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OurProductList } from 'src/assets/data/our-product';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DealNowModalComponent } from 'src/app/pages/our-product/deal-now-modal/deal-now-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-request-new-product',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SharedModule],
  templateUrl: './request-new-product.component.html',
  styleUrl: './request-new-product.component.scss'
})
export class RequestNewProductComponent {
  formGroup!:FormGroup;
  dummyourProductList:any[] = [];
  ourProductList:any[] = [];
  breadCrumbItems!: Array<{}>;


  isMobile: boolean = false;   
    constructor(private fb:FormBuilder ,
                private router:Router,
                private modalService:NgbModal
    ){
      this.isMobile = window.innerWidth <= 768; // Adjust the breakpoint according to your design
      window.addEventListener('resize', this.checkScreenWidth.bind(this));

      this.loadForm()
    }

    ngOnInit(): void {
      this.ourProductList = OurProductList;
      this.dummyourProductList = OurProductList.map((item:any)=>{
        item.isWishlist = false;
        return item;
      });
      this.breadCrumbItems = [
        { label: 'Profile' },
        { label: 'Sourcing Support', active: true }
      ];
    }

    loadForm(){
      this.formGroup = this.fb.group({
        productName:['Pomfret',Validators.compose([Validators.required])],
        prodCategory:['Fish',Validators.compose([Validators.required])],
        reqQuantity:['1MT',Validators.compose([Validators.required])],
        preferedLocation:['China',Validators.compose([Validators.required])],
        receiveLocation:['India',Validators.compose([Validators.required])],
        description:['',Validators.compose([Validators.required])],
      })
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

    checkScreenWidth() {
      this.isMobile = window.innerWidth <= 768; // Adjust the breakpoint according to your design
    }                                                // create this function



// validation
    isControlValid(controlName: string): boolean {
      const control = this.formGroup.controls[controlName];
      return control.valid && (control.dirty || control.touched);
    }
  
    isControlInvalid(controlName: string): boolean {
      const control = this.formGroup.controls[controlName];
      return control.invalid && (control.dirty || control.touched);
    }
  
    controlHasError(validation: any, controlName: any): boolean {
      const control = this.formGroup.controls[controlName];
      return control.hasError(validation) && (control.dirty || control.touched);
    }
  
    isControlTouched(controlName: any): boolean {
      const control = this.formGroup.controls[controlName];
      return control.dirty || control.touched;
    }
  
}
