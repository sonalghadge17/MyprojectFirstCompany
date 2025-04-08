import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PrivacyPolicy } from '../privacy-policy/privacy-policy';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../setting.service';
import { ContactUs } from './contact-us';
import { Subject, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { debounceTime } from 'rxjs/operators';
import { VeiwContactComponent } from './veiw-contact/veiw-contact.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  providers: [DatePipe]
})
export class ContactUsComponent {
  userList:any
  itemsPerPage = 10;
  pageNo = 1;
  listLength: any;
  public search: string = "";
  private subscriptions: Subscription[] = []
  requestBody!: {
    isPagination: number;
    fromDate: any;
    toDate: any;
    searchTerm: any;
    sortOrder:"DESC",
    pageNo: number;
    pageSize: number;
    sortBy: string;
    
  };
    private searchSubject = new Subject<string>();
      private isSearchSubscribed = false;
  fromDate:any
  currentUser: any;
  userId: any;
  toDate:any
  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private settingService:SettingService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private authFackservice: AuthfakeauthenticationService,) {
      this.currentUser = this.authFackservice.currentUserValue;
    }
    ngOnInit(): void {
      debugger;
    this.userId = this.currentUser.id;
    this.requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      searchTerm: this.search,
      sortBy: "createdDate",
      sortOrder: "DESC",
      fromDate: this.fromDate || "",
      toDate: this.toDate || "",
     
    };
    this.getAllContact_US();
  }
  Changeformdate() {
    debugger

    this.requestBody.fromDate = this.datePipe.transform(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day), 
      'yyyy-MM-dd'
    );
    
    this.getAllContact_US();
  }
  Changetodate() {
    debugger
    this.requestBody.toDate = this.datePipe.transform(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day), 
    'yyyy-MM-dd'
  );
    this.getAllContact_US();
  }
  searchevent(event: any) {
    const searchQuery = event.target.value;
    this.searchSubject.next(searchQuery);
    if (!this.isSearchSubscribed) {
      this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
        this.search = searchQuery;
        this.pageNo = 1;
        this.getAllContact_US();
      });
      this.isSearchSubscribed = true;
    }
  }
  itemsPerPageChange($event: any) {
    debugger
    this.pageNo = 1;
    this.itemsPerPage = parseInt($event.target.value);
    this.requestBody.pageSize=this.itemsPerPage
    this.getAllContact_US();
  }
  pageNoChange($event: any) {
    debugger
    this.requestBody.pageNo = $event-1
    this.pageNo = $event;
    this.pageNo;
    this.itemsPerPage;
    this.getAllContact_US();
  }
    reset() {
      this.fromDate = ""
      this.toDate = ""
      this.search=''
      this.getAllContact_US();
  }
  getAllContact_US() {
    debugger
    this.spinner.show();
    
    const sbGetAll = this.settingService.GetAllContactUsByPagination(this.requestBody).subscribe(
      (response: any) => {
        this.userList = response.data.content;  
        this.listLength = response.data.totalElements; 
      },
      (error:any) => {
        //  this.spinner.hide();
         this.toastr.error(error);
       }
    );
  }
  
  viewData(item: any) {
    const modalRef = this.modalService.open(VeiwContactComponent, {
      size: "lg",
    });
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.getAllContact_US();
      },
      () => {
        this.getAllContact_US();
      }
    );
  }
  
}

