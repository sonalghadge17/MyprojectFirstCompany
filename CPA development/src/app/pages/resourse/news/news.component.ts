import { Component } from '@angular/core';
import { AddNewsComponent } from './add-news/add-news.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject,Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from './news.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
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
   private newsService: NewsService,
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
  this.pageNo = 1;
  this.itemsPerPage = parseInt($event.target.value);
  this.Get_All_News();
}
pageNoChange($event: any) {
  this.pageNo = $event;
  this.pageNo;
  this.itemsPerPage;
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

  const sbGetAll = this.newsService
    .getallnewsBypegination(requestBody)
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
add_News(id: any) {
  const modalRef = this.modalService.open(AddNewsComponent,{
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
  const modalRef = this.modalService.open(AddNewsComponent, {
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
      this.deleteNews(id);
    },
    () => {}
  );
}
// deleteNews(id: number) {
//   debugger;
//   this.newsService.Delete_news(id).subscribe((res: any) => {
//     if (res.success) {
//       this.toastr.success(res.message);
//       this.Get_All_News();
//     } else {
//     }
//   });
// }
deleteNews(id: number) {
  debugger;
  this.newsService.Delete_news(id).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.Get_All_News();
      } else {
        this.toastr.error(res.message || 'Failed to delete news.');
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
