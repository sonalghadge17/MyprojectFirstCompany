import { Component, inject, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealSuccessModalComponent } from 'src/app/pages/our-product/deal-now-modal/deal-success-modal/deal-success-modal.component';

@Component({
  selector: 'app-accept-deal-modal',
  standalone: true,
  imports: [CommonModule,SharedModule,NgOptimizedImage],
  templateUrl: './accept-deal-modal.component.html',
  styleUrl: './accept-deal-modal.component.scss'
})
export class AcceptDealModalComponent {
  @Input() item:any;
  formGroup!:FormGroup;
  currentUser:any;
  batchList:any[] = [];
  public modal = inject(NgbActiveModal);
  private authFakeService = inject(AuthfakeauthenticationService);
  private fb = inject(FormBuilder);
  private modalService = inject(NgbModal);

  ngOnInit(): void {
     const currentUser = this.authFakeService.currentUserValue
     if(currentUser){
       this.currentUser = currentUser;
     }
     this.loadForm()
  }

  loadForm(){
    this.formGroup = this.fb.group({
      batchNo:['',],
      price:[''],
      sourceLocation:['',Validators.compose([Validators.required])],
      dateOfShipment:['',Validators.compose([Validators.required])],
      receivingLocation:['',Validators.compose([Validators.required])],
    })
  }

  onRemove(item:any){
    const indexIs = this.batchList.findIndex(item2 => item2.batchNo === item.batchNo)
    this.batchList.splice(indexIs,1)
  }

  addToTable(){
    if(this.formGroup.valid){
       const tableData = this.formGroup.value
       this.batchList.push(tableData);
    }else{
      this.formGroup.markAllAsTouched();
    }
  }

  acceptDealSuccess(){
    if(this.formGroup.valid){
      this.modal.close();
      const modalRef = this.modalService.open(DealSuccessModalComponent,{centered:true})
      modalRef.componentInstance.data = {
        heading:'Great !',
        para1:'Your Deal has been Submitted ',
        para2:'for admin approval '
      }
      modalRef.result.then(()=>{},()=>{})
    }else{
      this.formGroup.markAllAsTouched();
    }
  }


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
