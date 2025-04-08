import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.scss'
})
export class ViewPaymentComponent {
  @Input() item: any;
  data: any;

  constructor(
    public activeModal: NgbActiveModal,
    public paymentService: PaymentService
  ) {}
  ngOnInit(): void {
    // this.getServiceById()
    this.LoadPaymentData();
  }
  LoadPaymentData() {
    console.log(this.item)
    this.paymentService
      .PaymentById(this.item.id)
      .subscribe((res: any) => {
        this.data = res.data;
      });
  }


  downloadInvoice(invoiceID:any,filename:any){
    this.paymentService.downloadDocument(invoiceID,filename);
  }
}
