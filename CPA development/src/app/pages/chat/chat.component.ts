import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthfakeauthenticationService } from "src/app/core/services/authfake.service";
import { ChatService } from "./chat.service";
import { AddChatComponent } from "./add-chat/add-chat.component";
import { Subject, Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { debounceTime } from "rxjs/operators";
import { DeleteModalComponent } from "src/app/shared/delete-modal/delete-modal.component";
import { identity } from "lodash";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent {
  formGroup!: FormGroup;
  private searchSubject = new Subject<string>();
  private isSearchSubscribed = false;
  itemsPerPage = 10;
  pageNo = 1;
  search = "";
  loginRole: any;
  public currentUser: any;
  EmployeeId: any;
  categoryList: any;
  categoryId: any;
  subCategoryList: any;
  employeeList: any;
  statusList: any;
  UserList: any;
  adminUsersId: any;
  listLength: any;
  ticketCount: any;
  status: any;
  private subscriptions: Subscription[] = [];
  role: any;
  requestBody!: {
    isPagination: number;
    orderBy: "DESC";
    pageNo: number;
    pageSize: number;
    sortBy: string;
    searchTerm: string;
    status: string;
    role: any;
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authfakeauthenticationService: AuthfakeauthenticationService,
    private spinner: NgxSpinnerService,
    private chatService: ChatService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const currentUser = this.authfakeauthenticationService.currentUserValue;
    this.currentUser = currentUser;
    this.adminUsersId = currentUser.id;
    this.getallUser();
  }
  userIds: any;
  getallUser() {
    this.spinner.show();
    let requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      orderBy: "DESC",
      sortBy: "lastModifiedDate",
      searchTerm: this.search,
    };
    const sbGetAll = this.chatService
      .getallChatBypegination(requestBody)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.UserList = res.data.content;
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
  chatModel(item: any,userId:any) {
    debugger;
    const modalRef = this.modalService.open(AddChatComponent, {
      backdrop: "static",
      size: "xl",
    });
    modalRef.componentInstance.chatId = item.chatId;
    modalRef.componentInstance.userId = userId; 
    modalRef.componentInstance.item = item;

    modalRef.result.then(
      () => {},
      () => {}
    );
  }
  getById() {}
  deleteAction(id: any) {
    const modalRef = this.modalService.open(DeleteModalComponent,{backdrop:'static'})
    modalRef.result.then(()=>{this.deleteData(id)}, ()=>{})
  }
  deleteData(id:any){
    this.chatService.Delete_User(id).subscribe((res:any)=>{
      if(res.success){
        this.toastr.success(res.message,'',{toastClass:'toast-custom-success'});
        this.getallUser()
      }else{
        this.toastr.error(res.message,'',{toastClass:'toast-custom-error'})
      }
    },(error)=>{this.toastr.error('Something went wrong!','',{toastClass:'toast-custom-error'})})
  }
  searchEvent(event: any) {
    const searchQuery = event.target.value;
    this.searchSubject.next(searchQuery);
    if (!this.isSearchSubscribed) {
      this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
        this.search = searchQuery;
        this.pageNo = 1;
        this.getallUser();
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
    this.getallUser();
  }
  pageNoChange($event: any) {
    this.pageNo = $event - 1;
    this.requestBody.pageNo = this.pageNo;
    this.getallUser();
  }
}
