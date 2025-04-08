import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PaymentService } from './payment.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
 private searchSubject = new Subject<string>();
  private isSearchSubscribed = false;
 datalist: any;
 public search: string = "";
 itemsPerPage = 10;
 pageNo = 1;
 listLength: any;
 private subscriptions: Subscription[] = [];
 requestBody!: {
  isPagination: number;
  searchTerm: any;
   orderBy:"DESC",
   pageNo: number;
   pageSize: number;
   sortBy: string;
 };
fromDate: any;
toDate: any;
 constructor(
   private modalService: NgbModal,
   private paymentService: PaymentService,
   private spinner: NgxSpinnerService,
   private toastr: ToastrService
 ) {}
 ngOnInit(): void {
  this.get_All_Payment();
 }
 searchevent(event: any) {
  const searchQuery = event.target.value;
  this.searchSubject.next(searchQuery);
  if (!this.isSearchSubscribed) {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
      this.search = searchQuery;
      this.pageNo = 1;
      this.get_All_Payment();
    });
    this.isSearchSubscribed = true;
  }
}
itemsPerPageChange($event: any) {
  this.pageNo = 1;
  this.itemsPerPage = parseInt($event.target.value);
  this.get_All_Payment();
}
pageNoChange($event: any) {
  this.pageNo = $event;
  this.pageNo;
  this.itemsPerPage;
  this.get_All_Payment();
}
 get_All_Payment() {
  this.spinner.show();
  let requestB= {
    isPagination: 1,
    pageNo: this.pageNo - 1,
    pageSize: this.itemsPerPage,
    orderBy: "DESC",
    sortBy: "createdDate",
    searchTerm: this.search,
  }
  this.spinner.show();
  const sbGetAll = this.paymentService
    .getallPaymentBy_Pagination(requestB)
    .subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.datalist = res.data.content; 
          this.listLength = res.data.totalElements;
        } else {
          this.toastr.error('Failed to retrieve documents');
        }
      },
      (error) => {
        debugger
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  this.subscriptions.push(sbGetAll);
}
 add_Payment(id: any) {
   const modalRef = this.modalService.open(AddPaymentComponent,{
     size: "xl",
     centered: false,
   });
   modalRef.componentInstance.id = 0;
   modalRef.result.then(
     () => {
       this.get_All_Payment();
     },
     () => {
       this.get_All_Payment();
     }
   );
 }
 edit(id: any) {
   debugger
   const modalRef = this.modalService.open(AddPaymentComponent, {
     size: "xl",
   });
   modalRef.componentInstance.id = id;
   modalRef.result.then(
     () => {
       this.get_All_Payment();
     },
     () => {
       this.get_All_Payment();
     }
   );
 }

 viewData(item: any) {
  const modalRef = this.modalService.open(ViewPaymentComponent, {
    size: "lg",
    backdrop: true,
  });
  modalRef.componentInstance.item = item;

  modalRef.result.then(
    () => {
      this.get_All_Payment();
    },
    () => {
      this.get_All_Payment();
    }
  );
}
 delete(id: number) {
   debugger;
   const modalRef = this.modalService.open(DeleteModalComponent, {
     size: "sm",
   });
   modalRef.componentInstance.id = id;
   modalRef.result.then(
     () => {
       this.deleteNews(id);
     },
     () => {}
   );
 }
 deleteNews(id: number) { 
  debugger;
  this.paymentService.deletePayment(id).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.get_All_Payment();
      } else {
        this.toastr.error(res.message);
      }
    },
    error: (err) => {
      if (err.status === 403) {
        this.toastr.error(err);
      } else {
        this.toastr.error(err);
      }
    }
  });
}

 }
 