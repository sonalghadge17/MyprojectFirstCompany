import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from './document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { debounceTime } from 'rxjs/operators';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import * as FileSaver from 'file-saver';
import { ViewComponent } from './view/view.component';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent {
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
  listLength1: string|number|undefined;
  pageNo1 = 1 ;
  itemsPerPage1 = 10;
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
  documents: any;
  constructor(
    private modalService: NgbModal,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authFackservice: AuthfakeauthenticationService
  ) {
    this.currentUser = this.authFackservice.currentUserValue;
  }
  ngOnInit(): void {
    this.userId = this.currentUser.id;
    this.getallDocument();
    // this.getAllRecievedDocumentByPagination()
  }
  searchevent(event: any) {
    const searchQuery = event.target.value;
    this.searchSubject.next(searchQuery);
    if (!this.isSearchSubscribed) {
      this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
        this.search = searchQuery;
        this.pageNo = 1;
        this.getallDocument();
        this.getAllRecievedDocumentByPagination();
      });
      this.isSearchSubscribed = true;
    }
  }
  // for pagination
  itemsPerPageChange($event: any) {
    this.pageNo = 1;
    this.itemsPerPage = parseInt($event.target.value);
    this.getallDocument();
  }
  pageNoChange($event: any) {
    this.pageNo = $event;
    this.pageNo;
    this.itemsPerPage;
    this.getallDocument();
    // this.fetchUserDocuments();
  }
  isDocumentFile(extension: string): boolean {
    // Check if the document file is a PDF or Word file
    return extension === 'pdf' || extension === 'docx' || extension === 'doc';
  }

  getallDocument() {
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
      documentType:"DOCUMENT"
    }
    this.spinner.show();
    const sbGetAll = this.documentService
      .getallDocumentBy_Pagination(requestB)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.datalist = res.data.content; 
            this.documents = res || [];
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
    this.subscriptions.push(sbGetAll);
  }
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|jfif)$/i.test(url);
  }
  // download(id: any, url: any) {
  //   const list = url.split('/');
  //   const key = list[list.length - 1];  
  //   this.documentService.downloadDocument(id, key);
  // }
  // downloadAllAsZip(documentId: string) {
  //   if (!documentId) {
  //     console.error('Document ID is missing');
  //     return;
  //   }
  //   const selectedDocuments = this.documents.find((doc: any) => doc.id === documentId)?.userDocumentResponses;
  //   if (!selectedDocuments || selectedDocuments.length <= 1) {
  //     console.error('Not enough documents to create a ZIP. At least two files are required.');
  //     return;
  //   }
  //   this.documentService.downloadZip(documentId).subscribe(
  //     (response: Blob) => {
  //       const blob = new Blob([response], { type: 'application/zip' });
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = 'documents.zip';
  //       link.click();
  //       window.URL.revokeObjectURL(url);
  //     },
  //     (error) => {
  //       console.error('Error downloading ZIP:', error);
  //     }
  //   );
  // }


  isImageFile(filePath: string): boolean {
    return /\.(png|jpe?g)$/i.test(filePath);
  }
  Delete_Document(id: number) {
    // debugger;
    // this.documentService.Delete_Document(id).subscribe((res: any) => {
    //   if (res.success) {
    //     this.toastr.success(res.message);
    //     this.getallDocument();
    //   } else {
    //   }
    // });
  }
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      this.activeindex = '1'
      this.getallDocument();
      
    }
    if (changeEvent.nextId === 2) {
      this.activeindex = '2'
      this.getAllRecievedDocumentByPagination()
    }
    if (changeEvent.nextId === 3) {
      this.activeindex = '3'
    }
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
  isModalOpen = false;
  // View_Document(item: any): void {
  //   const modalRef = this.modalService.open(ViewComponent, {
  //     centered: false,
  //     scrollable: true,
  //     size: 'lg',
  //   });
  
  //   modalRef.componentInstance.item = item;
  
  //   // Move focus to the modal
  //   modalRef.result
  //     .then(() => this.getallDocument()) // Handle success
  //     .catch(() => this.getallDocument()) // Handle dismissal
  //     .finally(() => {
  //       // Ensure focus is restored after the modal is closed
  //       const safeElement = document.querySelector('button') as HTMLElement;
  //       safeElement?.focus();
  //     });
  // }
  add_Document(id: any) {
    const modalRef = this.modalService.open(AddDocumentComponent, {
      size: "xl",
      centered: false,
    });
    modalRef.componentInstance.id = 0;
    modalRef.componentInstance.documentType = "DOCUMENT"
    modalRef.result.then(
      () => {
        this.getallDocument();
      },
      () => {
        this.getallDocument();
      }
    );
  }
  edit(id: any) {
    debugger
    const modalRef = this.modalService.open(AddDocumentComponent, {
      size: "xl",
    });
    modalRef.componentInstance.id = id;
      modalRef.componentInstance.documentType = "DOCUMENT"
    modalRef.result.then(
      () => {
        this.getallDocument();
      },
      () => {
        this.getallDocument();
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
      this.documentService.Delete_Document(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.getallDocument();
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
          this.getAllRecievedDocumentByPagination();
        });
        this.isSearchSubscribed = true;
      }
    }
    // for pagination
    itemsPerPageChange1($event: any) {
      this.pageNo1 = 1;
      this.itemsPerPage1 = parseInt($event.target.value);
      this.getAllRecievedDocumentByPagination();
    }
    pageNoChange1($event: any) {
      this.pageNo1 = $event;
      this.pageNo1;
      this.itemsPerPage1;
      this.getAllRecievedDocumentByPagination();
      // this.fetchUserDocuments();
    }

    getAllRecievedDocumentByPagination(){
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
      documentType:"DOCUMENT"
    }
    this.spinner.show();
    const sbGetAll = this.documentService
      .getallDocumentBy_Pagination(requestBody)
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
          this.toastr.error(error.message || 'An error occurred');
        }
      );
    this.subscriptions.push(sbGetAll);
  }
    }
  
  

