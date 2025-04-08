import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject,Subscription } from 'rxjs';
import { AddWhitepaperComponent } from './add-whitepaper/add-whitepaper.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { WhitepaperService } from './whitepaper.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  styleUrl: './whitepaper.component.scss'
})
export class WhitepaperComponent {
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
   private whitepaperService: WhitepaperService,
   private spinner: NgxSpinnerService,
   private toastr: ToastrService
 ) {}
 ngOnInit(): void {
   
  this.Get_All_News();
}
searchevent(event: any) {
  const searchQuery = event.target.value;
  this.searchSubject.next(searchQuery);
  if (!this.isSearchSubscribed) {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
      this.search = searchQuery;
      this.pageNo = 1;
      this.Get_All_News();
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
  this.Get_All_News();
}
pageNoChange($event: any) {
  debugger
  this.pageNo = $event;
  // this.requestBody.pageNo = this.pageNo;
  this.Get_All_News();
}

Get_All_News() {
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

  const sbGetAll = this.whitepaperService
    .getall_WhitepaperBypegination(requestBody)
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
  // this.subscriptions.push(sbGetAll);
}
add_WhitePaper(id: any) {
  const modalRef = this.modalService.open(AddWhitepaperComponent,{
    size: "xl",
    centered: false,
  });
  modalRef.componentInstance.id = 0;
  modalRef.result.then(
    () => {
      this.Get_All_News();
    },
    () => {
      this.Get_All_News();
    }
  );
}
edit(id: any) {
  debugger
  const modalRef = this.modalService.open(AddWhitepaperComponent, {
    size: "xl",
  });
  modalRef.componentInstance.id = id;
  modalRef.result.then(
    () => {
      this.Get_All_News();
    },
    () => {
      this.Get_All_News();
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
      this.deleteWhitepaper(id);
    },
    () => {}
  );
}
// deleteWhitepaper(id: number) {
//   debugger;
//   this.whitepaperService.Delete_WhitePaper(id).subscribe((res: any) => {
//     if (res.success) {
//       this.toastr.success(res.message);
//       this.Get_All_News();
//     } else {
//     }
//   });
// }
deleteWhitepaper(id: number) {
  debugger;
  this.whitepaperService.Delete_WhitePaper(id).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.Get_All_News(); // Make sure this method is correct for fetching whitepapers
      } else {
        this.toastr.error(res.message || 'Failed to delete whitepaper.');
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
