import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "./user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subject, Subscription } from "rxjs";
import { User } from "./user";
import { AddUserComponent } from "./add-user/add-user.component";
import { DeleteModalComponent } from "src/app/shared/delete-modal/delete-modal.component";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.scss",
})
export class UserComponent {
  User!: User;
  private searchSubject = new Subject<string>();
    private isSearchSubscribed = false;
  data: any;
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
    role: any;
  };
  status: any;
  role: any;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      orderBy: "DESC",
      sortBy: "createdDate",
      searchTerm: this.search,
      status: this.status || "",
      role: 'USER',
    };
    this.getallUser();
  }
  searchevent(event: any) {
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
  getEmailLink(email: string): string {
  if (email.includes('@gmail.com')) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  } else if (email.includes('@outlook.com')) {
    return `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}`;
  } else {
    return `mailto:${email}`; // Default mailto for other email clients
  }
}
  getallUser() {
    debugger
    this.spinner.show();
    const sbGetAll = this.userService
      .getallUserBypegination(this.requestBody)
      .subscribe(
        (res: any) => {
          debugger
          this.spinner.hide();
          if (res.success) {
            this.datalist = res.data.content;
            this.listLength = res.data.totalElements;
          } else {
          }
        },
        (error) => {
          debugger
          this.spinner.hide();
          this.toastr.error(error);
        }
      );
    // this.subscriptions.push(sbGetAll);
  }

  toggleUserStatus(item: any) {
    const newStatus = item.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    this.userService.Block_User(item.id).subscribe(
      (res: any) => {
        item.status = newStatus;
        this.toastr.success(res.message);
      },
      (err: any) => {
        console.error("Error blocking/unblocking user: ", err);
        this.toastr.error("Failed to update user status");
      }
    );
  }
  Add_User(id: any) {
    const modalRef = this.modalService.open(AddUserComponent, {
      size: "xl",
      centered: false,
    });
    modalRef.componentInstance.id = 0;
    modalRef.result.then(
      () => {
        this.getallUser();
      },
      () => {
        this.getallUser();
      }
    );
  }
  edit(id: any) {
    const modalRef = this.modalService.open(AddUserComponent, {
      size: "xl",
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => {
        this.getallUser();
      },
      () => {
        this.getallUser();
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
        this.deleteUser(id);
      },
      () => {}
    );
  }
  deleteUser(id: number) {
    debugger;
    this.userService.Delete_User(id).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.getallUser();
      } else {
      }
    });
  }
}
