import { Component } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { AddAccountComponent } from './add-account/add-account.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { debounceTime } from 'rxjs/operators';
import { AccountService } from './account.service';
import { ViewComponent } from '../document/view/view.component';
import { AddDocumentComponent } from '../document/add-document/add-document.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
private searchSubject = new Subject<string>();
  private isSearchSubscribed = false;
  Document!: Document;
  uploadedDocuments:any
  activeindex: any;
  datalist: any;
  public search: string = "";
  itemsPerPage = 10;
  pageNo = 1;
  listLength: any;
  private subscriptions: Subscription[] = [];
  requestB!: {
    isPagination: number;
    date: string;
   
    searchTerm: any;
    orderBy:"DESC",
    pageNo: number;
    pageSize: number;
    sortBy: string;
  };

  requestBody!: {
    isPagination: number;
    date: string;
   
    searchTerm: any;
    orderBy:"DESC",
    pageNo: number;
    pageSize: number;
    sortBy: string;
  };
  Recieveddatalist:any

document: any;
deleteModel: any;
  status: any
  data: any;
documentData: any;
doc: any;
userList:any
  role:any
  currentUser: any;
  userId: any;
  documentList: any[] = [];
  isModalOpen!: boolean;
listLength1: string|number|undefined;
  pageNo1 = 1 ;
  itemsPerPage1 = 10;
  constructor(
    private modalService: NgbModal,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authFackservice: AuthfakeauthenticationService
  ) {
    this.currentUser = this.authFackservice.currentUserValue;
  }
  ngOnInit(): void {
    this.userId = this.currentUser.id;
    this.getallAccount();
    // this.getAllRecievedAccountByPagination()

    
  }
  searchevent(event: any) {
    const searchQuery = event.target.value;
    this.searchSubject.next(searchQuery);
    if (!this.isSearchSubscribed) {
      this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
        this.search = searchQuery;
        this.pageNo = 1;
        this.getallAccount();
        this.getAllRecievedAccountByPagination
      });
      this.isSearchSubscribed = true;
    }
  }
  // for pagination
  itemsPerPageChange($event: any) {
    this.pageNo = 1;
    this.itemsPerPage = parseInt($event.target.value);
    this.getallAccount();
  }
  pageNoChange($event: any) {
    this.pageNo = $event;
    this.pageNo;
    this.itemsPerPage;
    this.getallAccount();
    // this.fetchUserDocuments();
  }
  isDocumentFile(extension: string): boolean {
    // Check if the document file is a PDF or Word file
    return extension === 'pdf' || extension === 'docx' || extension === 'doc';
  }
  download(id: any, url: any) {
    const list = url.split('/');
    const key = list[list.length - 1];  
    this.accountService.downloadAccount(id, key);
  }

   View_Document(item: any): void {
      this.isModalOpen = true;
      const modalRef = this.modalService.open(ViewComponent, {
        centered: false,
        scrollable: true,
        size: 'lg',
      });
      modalRef.componentInstance.item = item;
      modalRef.result.finally(() => {
        this.isModalOpen = false; 
      });
    }
  getallAccount() {
    debugger
    this.spinner.show();
    let requestB= {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      sortOrder: "DESC",
      sortBy: "createdDate",
      searchTerm: this.search,
      status: this.status || "",
      userId:"",
      type:"ADMIN",
      date:"",
      documentType:"ACCOUNT DOCUMENT"
    }
    this.spinner.show();
    const sbGetAll = this.accountService
      .getallAccountBy_Pagination(requestB)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.datalist = res.data.content;  // Use 'document' for storing documents
            this.listLength = res.data.totalElements;
          } else {
            this.toastr.error('Failed to retrieve documents');
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error);
        }
      );
    // this.subscriptions.push(sbGetAll);
  }
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|jfif)$/i.test(url);
  }
  
  
  isImageFile(filePath: string): boolean {
    return /\.(png|jpe?g)$/i.test(filePath);
  }
 
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      debugger
      this.activeindex = '1'
      this.getallAccount();
    }
    if (changeEvent.nextId === 2) {
      debugger
      this.activeindex = '2'
      this.getAllRecievedAccountByPagination()
    }
    if (changeEvent.nextId === 3) {
      this.activeindex = '3'
    }
  }
  

  
  add_Account(id: any) {
    const modalRef = this.modalService.open(AddDocumentComponent, {
      size: "xl",
      centered: false,
    });
    modalRef.componentInstance.id = 0;
    modalRef.componentInstance.documentType= 'ACCOUNT DOCUMENT'
    modalRef.result.then(
      () => {
        this.getallAccount();
      },
      () => {
        this.getallAccount();
      }
    );
  }
  edit(id: any) {
    debugger
    const modalRef = this.modalService.open(AddDocumentComponent, {
      size: "xl",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.documentType= 'ACCOUNT DOCUMENT'
    modalRef.result.then(
      () => {
        this.getallAccount();
      },
      () => {
        this.getallAccount();
      }
    );
  }
    delete(id: number) {
      debugger;
      const modalRef = this.modalService.open(DeleteModalComponent, {
        size: "sm",
        centered: true,
      });
      modalRef.componentInstance.id = id;
      modalRef.result.then(
        () => {
          this.deleteDocument(id);
        },
        () => {}
      );
    }
  
    deleteDocument(id: number) {
      debugger;
      this.accountService.Delete_Document(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.getallAccount();
      this.getAllRecievedAccountByPagination()

          } else {
            this.toastr.error(res.message || 'Failed to delete document.');
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
    
    searchevent1(event: any) {
      const searchQuery = event.target.value;
      this.searchSubject.next(searchQuery);
      if (!this.isSearchSubscribed) {
        this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
          this.search = searchQuery;
          this.pageNo = 1;
          this.getAllRecievedAccountByPagination();
        });
        this.isSearchSubscribed = true;
      }
    }
    // for pagination
    itemsPerPageChange1($event: any) {
      this.pageNo1 = 1;
      this.itemsPerPage1 = parseInt($event.target.value);
      this.getAllRecievedAccountByPagination();
    }
    pageNoChange1($event: any) {
      this.pageNo1 = $event;
      this.pageNo1;
      this.itemsPerPage1;
      this.getAllRecievedAccountByPagination();
      // this.fetchUserDocuments();
    }


    getAllRecievedAccountByPagination(){
      debugger
      this.spinner.show();
    let requestBody= {
      isPagination: 1,
      pageNo: this.pageNo1 - 1,
      pageSize: this.itemsPerPage1,
      sortOrder: "DESC",
      sortBy: "createdDate",
      searchTerm: this.search,
      status: this.status || "",
      userId:"",
      type:"USER",
      date:"",
      documentType:"ACCOUNT DOCUMENT"
    }
    this.spinner.show();
    const sbGetAll = this.accountService
      .getallAccountBy_Pagination(requestBody)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.Recieveddatalist = res.data.content;  
            this.listLength1 = res.data.totalElements;
          } else {
            this.toastr.error('Failed to retrieve documents');
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error);
        }
      );
    // this.subscriptions.push(sbGetAll);
  }
    }
  
  

