import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { JobsService } from './jobs.service';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {
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
   private jobsService: JobsService,
   private spinner: NgxSpinnerService,
   private toastr: ToastrService
 ) {}
 ngOnInit(): void {
   
  this.Get_All_JobS();
}
searchevent(event: any) {
  const searchQuery = event.target.value;
  this.searchSubject.next(searchQuery);
  if (!this.isSearchSubscribed) {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
      this.search = searchQuery;
      this.pageNo = 1;
      this.Get_All_JobS();
    });
    this.isSearchSubscribed = true;
  }
}
// for pagination
itemsPerPageChange($event: any) {
  this.pageNo = 1;
  this.itemsPerPage = parseInt($event.target.value);
  this.Get_All_JobS();
}
pageNoChange($event: any) {
  this.pageNo = $event;
  this.pageNo;
  this.itemsPerPage;
  this.Get_All_JobS();
}

Get_All_JobS() {
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
toggleStatus(jobId: number, currentStatus: string) {
  debugger
  const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : (currentStatus ? 'ACTIVE' : 'ACTIVE');
  
  // Example API call payload
  // const payload = {
  //   usersId : jobId,
  //   status : newStatus
  // };

 
  this.jobsService.updateJobStatus(jobId,newStatus).subscribe(
    (response) => {
      this.toastr.success('Status updated successfully');
      this.Get_All_JobS()
      // Optionally reload data or update status locally
      // const item = this.datalist.find((job:any) => job.id === jobId);
      // if (item) {
      //   item.status = newStatus;
      // }
    },
    (error) => {
      this.toastr.error('Failed to update status');
    }
  );
}
add_Jobs(id: any) {
  const modalRef = this.modalService.open(AddJobsComponent,{
    size: "xl",
    centered: false,
  });
  modalRef.componentInstance.id = 0;
  modalRef.result.then(
    () => {
      this.Get_All_JobS();
    },
    () => {
      this.Get_All_JobS();
    }
  );
}
edit(id: any) {
  debugger
  const modalRef = this.modalService.open(AddJobsComponent, {
    size: "xl",
  });
  modalRef.componentInstance.id = id;
  modalRef.result.then(
    () => {
      this.Get_All_JobS();
    },
    () => {
      this.Get_All_JobS();
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
//   this.jobsService.Delete_Jobs(id).subscribe((res: any) => {
//     if (res.success) {
//       this.toastr.success(res.message);
//       this.Get_All_JobS();
//     } else {
//     }
//   });
// }
deleteFaqs(id: number) {
  debugger;
  this.jobsService.Delete_Jobs(id).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.Get_All_JobS();
      } else {
        this.toastr.error(res.message || 'Failed to delete the job.');
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
