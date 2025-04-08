import { Component } from '@angular/core';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject,Subscription } from 'rxjs';
import { BolgService } from './bolg.service';
import { debounceTime } from 'rxjs/operators';
import { AddBlogComponent } from './add-blog/add-blog.component';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
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
    orderBy: any;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    searchTerm: string;
    status: string;
  };
fromDate: any;
toDate: any;
  constructor(
    private modalService: NgbModal,
    private bolgService: BolgService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    
    this.Get_All_Blog();
  }
  searchevent(event: any) {
    const searchQuery = event.target.value;
    this.searchSubject.next(searchQuery);
    if (!this.isSearchSubscribed) {
      this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
        this.search = searchQuery;
        this.pageNo = 1;
        this.Get_All_Blog();
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
    this.Get_All_Blog();
  }
  pageNoChange($event: any) {
    this.pageNo = $event - 1;
    this.requestBody.pageNo = this.pageNo;
    this.Get_All_Blog();
  }
 
  Get_All_Blog() {
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

    const sbGetAll = this.bolgService
      .getallBlogBypegination(requestBody)
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
  add_Blog(id: any) {
    const modalRef = this.modalService.open(AddBlogComponent, {
      size: "xl",
      centered: false,
    });
    modalRef.componentInstance.id = 0;
    modalRef.result.then(
      () => {
        this.Get_All_Blog();
      },
      () => {
        this.Get_All_Blog();
      }
    );
  }
  edit(id: any) {
    debugger
    const modalRef = this.modalService.open(AddBlogComponent, {
      size: "xl",
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => {
        this.Get_All_Blog();
      },
      () => {
        this.Get_All_Blog();
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
        this.deleteCategory(id);
      },
      () => {}
    );
  }
  // deleteCategory(id: number) {
  //   debugger;
  //   this.bolgService.Delete_Blog(id).subscribe((res: any) => {
  //     if (res.success) {
  //       this.toastr.success(res.message);
  //       this.Get_All_Blog();
  //     } else {
  //     }
  //   });
  // }
  deleteCategory(id: number) {
    debugger;
    this.bolgService.Delete_Blog(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.Get_All_Blog();
        } else {
          this.toastr.error(res.message || 'Failed to delete category.');
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
