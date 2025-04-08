import { Component } from '@angular/core';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject,Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { TestimonialService } from './testimonial.service';
import { AddTestimonialsComponent } from './add-testimonials/add-testimonials.component';
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
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
   private testimonialService: TestimonialService,
   private spinner: NgxSpinnerService,
   private toastr: ToastrService
 ) {}
 ngOnInit(): void {
   
  this.Get_All_testimonial();
}
searchevent(event: any) {
  const searchQuery = event.target.value;
  this.searchSubject.next(searchQuery);
  if (!this.isSearchSubscribed) {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
      this.search = searchQuery;
      this.pageNo = 1;
      this.Get_All_testimonial();
    });
    this.isSearchSubscribed = true;
  }
}
// for pagination
itemsPerPageChange($event: any) {
  this.pageNo = 1;
  this.itemsPerPage = parseInt($event.target.value);
  this.Get_All_testimonial();
}
pageNoChange($event: any) {
  this.pageNo = $event;
  this.pageNo;
  this.itemsPerPage;
  this.Get_All_testimonial();
}

Get_All_testimonial() {
  debugger
  //  let requestBody = {
  //     isPagination: 1,
  //     pageNo: this.pageNo - 1,
  //     pageSize: this.itemsPerPage,
  //     sortOrder: "asc",
  //     sortBy: "createdDate",
  //     searchTerm: this.search,
  // };
  this.spinner.show();
  const sbGetAll = this.testimonialService
    .getallTestimonialBypegination()
    .subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.datalist = res.data;
       
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
add_Testimonial(id: any) {
  const modalRef = this.modalService.open(AddTestimonialsComponent,{
    size: "xl",
    centered: false,
  });
  modalRef.componentInstance.id = 0;
  modalRef.result.then(
    () => {
      this.Get_All_testimonial();
    },
    () => {
      this.Get_All_testimonial();
    }
  );
}
edit(id: any) {
  debugger
  const modalRef = this.modalService.open(AddTestimonialsComponent, {
    size: "xl",
  });
  modalRef.componentInstance.id = id;
  modalRef.result.then(
    () => {
      this.Get_All_testimonial();
    },
    () => {
      this.Get_All_testimonial();
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
      this.deletetestimonial(id);
    },
    () => {}
  );
}
// deletetestimonial(id: number) {
//   debugger;
//   this.testimonialService.Delete_Testimonial(id).subscribe((res: any) => {
//     if (res.success) {
//       this.toastr.success(res.message);
//       this.Get_All_testimonial();
//     } else {
//     }
//   });
// }
deletetestimonial(id: number) {
  debugger;
  this.testimonialService.Delete_Testimonial(id).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.Get_All_testimonial();
      } else {
        this.toastr.error(res.message || 'Failed to delete the testimonial.');
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
