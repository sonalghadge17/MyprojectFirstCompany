import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UserService } from '../user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgxPaginationModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  @ViewChild('user') Chargebacktable!: ElementRef;

  searchUpdate = new Subject<string>();

  itemsPerPage = 10;
  pageNo = 1;
  dataList!: any[];
  public search: string = '';
  listLength: any;
  excelList: any;
  requestBody: any
  datalist: any;
  constructor(
    private UserService: UsersService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
     private toastr: ToastrService
  ) {
    this.searchUpdate.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        this.pageNo = 1
        this.getAllUsers()
      });
  }

  ngOnInit(): void {
    this.requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      orderBy: "DESC",
      sortBy: "createdDate",
      searchTerm: this.search,
      status: "",
      role: 'subadmin',
    };
    this.getAllUsers()
  }



  itemsPerPageChange($event:Event) {
    // this.itemsPerPage = parseInt($event.target?.value || '0');
    this.itemsPerPage;
    this.pageNo;
    this.itemsPerPage;
    this.getAllUsers();
  }
  pageNoChange($event: number) {
    this.pageNo = $event;
    this.pageNo;
    this.itemsPerPage;
    this.getAllUsers();
  }

  getAllUsers() {
    this.spinner.show();
    const sbGetAll = this.UserService
      .getallUserBypegination(this.requestBody)
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
  
  }



  getAllUsersForExcel() {
    this.spinner.show()
    let requestBody = {
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      searchTerm: this.search,
      // role: Role.STAFF,
      isPagination: 0,
      sortBy: '',
      sortOrder: 'ASC',
    }

    // this.usreService.getAllUsers(requestBody).subscribe((res: { success: any; data: any; }) => {

    //   this.spinner.hide()
    //   if (res.success) {
    //     this.excelList = res.data;
    //   } else {
    //   }
    // }, () => this.spinner.hide())
  }



 


   //excel
   ExportExcelChargeBack():void {

    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.Chargebacktable.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // / save to file /
    // XLSX.writeFile(wb, 'users.xlsx');

   // this.excelService.exportAsExcelFile(this.ChargebackData , 'sample');
  }
 Add_User(id: any) {
    const modalRef = this.modalService.open(ManageUsersComponent, {
      size: "xl",
      centered: false,
    });
    modalRef.componentInstance.id = 0;
    modalRef.result.then(
      () => {
        this.getAllUsers();
      },
      () => {
        this.getAllUsers();
      }
    );
  }
edit(id: any) {
    const modalRef = this.modalService.open(ManageUsersComponent, {
      size: "xl",
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => {
        this.getAllUsers();
      },
      () => {
        this.getAllUsers();
      }
    );
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
  // deleteUser(id: number) {
  //   debugger;
  //   this.UserService.Delete_User(id).subscribe((res: any) => {
  //     if (res.success) {
  //       this.toastr.success(res.message);
  //       this.getAllUsers();
  //     } else {
  //     }
  //   });
  // }
  deleteUser(id: number) {
    debugger;
    this.UserService.Delete_User(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.getAllUsers();
        } else {
          this.toastr.error(res.message || 'Failed to delete the user.');
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
  
  searchevent(event: any) {
    // const searchQuery = event.target.value;
    // this.searchSubject.next(searchQuery);
    // if (!this.isSearchSubscribed) {
    //   this.searchSubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
    //     this.search = searchQuery;
    //     this.pageNo = 1;
    //     this.getAllUsers();
    //   });
    //   this.isSearchSubscribed = true;
    // }
  }
}
