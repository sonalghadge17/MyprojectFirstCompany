import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { JobsService } from '../../about-us/jobs/jobs.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AppliedJobService } from './applied-job.service';

@Component({
  selector: 'app-applied-job',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,FormsModule],
  templateUrl: './applied-job.component.html',
  styleUrl: './applied-job.component.scss'
})
export class AppliedJobComponent {
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
   private jobsService: AppliedJobService,
   private spinner: NgxSpinnerService,
   private toastr: ToastrService
 ) {}
 ngOnInit(): void {
   
  this.getAllAppliedJob();
}
searchevent(event: any) {
  const searchQuery = event.target.value;
  this.searchSubject.next(searchQuery);
  if (!this.isSearchSubscribed) {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
      this.search = searchQuery;
      this.pageNo = 1;
      this.getAllAppliedJob();
    });
    this.isSearchSubscribed = true;
  }
}
// for pagination
itemsPerPageChange($event: any) {
  this.pageNo = 1;
  this.itemsPerPage = parseInt($event.target.value);
  this.getAllAppliedJob();
}
pageNoChange($event: any) {
  this.pageNo = $event;
  this.pageNo;
  this.itemsPerPage;
  this.getAllAppliedJob();
}
downloadFile(documentId:any) {
   
  this.jobsService.downloadResume(documentId);
}
getAllAppliedJob() {
  debugger
   let requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      sortOrder: "DESC",
      sortBy: "createdDate",
      searchTerm: this.search,
  };
  this.spinner.show();

  const sbGetAll = this.jobsService
    .getall_Jobs_Bypegination(requestBody)
    .subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.datalist = res.data.content;
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

// add_Jobs(id: any) {
//   const modalRef = this.modalService.open(AddJobsComponent,{
//     size: "xl",
//     centered: false,
//   });
//   modalRef.componentInstance.id = 0;
//   modalRef.result.then(
//     () => {
//       this.getAllAppliedJob();
//     },
//     () => {
//       this.getAllAppliedJob();
//     }
//   );
// }
// edit(id: any) {
//   debugger
//   const modalRef = this.modalService.open(AddJobsComponent, {
//     size: "xl",
//   });
//   modalRef.componentInstance.id = id;
//   modalRef.result.then(
//     () => {
//       this.getAllAppliedJob();
//     },
//     () => {
//       this.getAllAppliedJob();
//     }
//   );
// }
// delete(id: number) {
//   debugger;
//   const modalRef = this.modalService.open(DeleteModalComponent, {
//     size: "sm",
//   });
//   modalRef.componentInstance.id = id;
//   modalRef.result.then(
//     () => {
//       this.deleteFaqs(id);
//     },
//     () => {}
//   );
// }
// deleteFaqs(id: number) {
//   debugger;
//   this.jobsService.Delete_Jobs(id).subscribe((res: any) => {
//     if (res.success) {
//       this.toastr.success(res.message);
//       this.getAllAppliedJob();
//     } else {
//     }
//   });
// }
}
