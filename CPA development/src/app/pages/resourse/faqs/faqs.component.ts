import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject,Subscription } from 'rxjs';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { FaqsService } from './faqs.service';
import { debounceTime } from 'rxjs/operators';
import { AddFaqsComponent } from './add-faqs/add-faqs.component';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {
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
   fromDate: string;
   toDate: string;
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
   private faqsService: FaqsService,
   private spinner: NgxSpinnerService,
   private toastr: ToastrService
 ) {}
 ngOnInit(): void {
   
  this.Get_All_FAQS();
}
searchevent(event: any) {
  const searchQuery = event.target.value;
  this.searchSubject.next(searchQuery);
  if (!this.isSearchSubscribed) {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
      this.search = searchQuery;
      this.pageNo = 1;
      this.Get_All_FAQS();
    });
    this.isSearchSubscribed = true;
  }
}
// for pagination
itemsPerPageChange($event: any) {
  this.itemsPerPage = parseInt($event.target.value);
  this.requestBody.pageSize = this.itemsPerPage;
  this.itemsPerPage;
  this.requestBody.pageNo = 0;
  this.Get_All_FAQS();
}
pageNoChange($event: any) {
  this.pageNo = $event - 1;
  this.requestBody.pageNo = this.pageNo;
  this.Get_All_FAQS();
}

Get_All_FAQS() {
  debugger
   let requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      sortOrder: "asc",
      sortBy: "createdDate",
      searchTerm: this.search,
  };
  this.spinner.show();

  const sbGetAll = this.faqsService
    .getallFaqsBypegination(requestBody)
    .subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.datalist = res.data;
          this.listLength = res.data.totalElements;
        } else {
        }
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  this.subscriptions.push(sbGetAll);
}
add_Faqs(id: any) {
  const modalRef = this.modalService.open(AddFaqsComponent,{
    size: "xl",
    centered: false,
  });
  modalRef.componentInstance.id = 0;
  modalRef.result.then(
    () => {
      this.Get_All_FAQS();
    },
    () => {
      this.Get_All_FAQS();
    }
  );
}
edit(id: any) {
  debugger
  const modalRef = this.modalService.open(AddFaqsComponent, {
    size: "xl",
  });
  modalRef.componentInstance.id = id;
  modalRef.result.then(
    () => {
      this.Get_All_FAQS();
    },
    () => {
      this.Get_All_FAQS();
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
      this.deleteFaqs(id);
    },
    () => {}
  );
}
// deleteFaqs(id: number) {
//   debugger;
//   this.faqsService.Delete_Faqs(id).subscribe((res: any) => {
//     if (res.success) {
//       this.toastr.success(res.message);
//       this.Get_All_FAQS();
//     } else {
//     }
//   });
// }

deleteFaqs(id: number) {
  debugger;
  this.faqsService.Delete_Faqs(id).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.Get_All_FAQS();
      } else {
        this.toastr.error(res.message || 'Failed to delete FAQ.');
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
