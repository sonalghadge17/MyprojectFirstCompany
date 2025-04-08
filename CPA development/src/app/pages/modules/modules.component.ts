import { Component } from '@angular/core';
import { Modules } from './modules';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModulesService } from './modules.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent {
  Modules!: Modules;
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
    private modulesService: ModulesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.requestBody = {
      isPagination: 1,
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      orderBy: "lastModifiedDate",
      sortBy: "id",
      searchTerm: this.search,
      status: this.status || "",
      role: this.role || "",
    };
    this.getallModule();
  }
  itemsPerPageChange($event: any) {
    this.itemsPerPage = parseInt($event.target.value);
    this.requestBody.pageSize = this.itemsPerPage;
    this.itemsPerPage;
    this.requestBody.pageNo = 0;
    // this.getallUser();
  }
  pageNoChange($event: any) {
    this.pageNo = $event - 1;
    this.requestBody.pageNo = this.pageNo;
    // this.getallUser();
  }
  searchevent($event: any) {
    // this.requestBody.isPagination = 1;
    this.requestBody.searchTerm = $event.target.value;
    // this.getallUser();
  }

  getallModule() {
    this.spinner.show();
    const sbGetAll = this.modulesService
      .Get_Modules()
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            const rawData = res.data || {};
            this.datalist = Object.keys(rawData).map(key => ({
              key, 
              endpoints: rawData[key]
            }));
            this.listLength = this.datalist.length; 
          } else {
            this.toastr.error('Failed to fetch data.');
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error('Error fetching modules: ' + error.message);
        }
      );
    this.subscriptions.push(sbGetAll);
  }
  Add_User(id: any) {
    // const modalRef = this.modalService.open(AddUserComponent, {
    //   size: "xl",
    //   centered: false,
    // });
    // modalRef.componentInstance.id = 0;
    // modalRef.result.then(
    //   () => {
    //     this.getallUser();
    //   },
    //   () => {
    //     this.getallUser();
    //   }
    // );
  }
  edit(id: any) {
    // const modalRef = this.modalService.open(AddUserComponent, {
    //   size: "xl",
    // });
    // modalRef.componentInstance.id = id;
    // modalRef.result.then(
    //   () => {
    //     this.getallUser();
    //   },
    //   () => {
    //     this.getallUser();
    //   }
    // );
  }
  delete(id: number) {
    // debugger;
    // const modalRef = this.modalService.open(DeleteModalComponent, {
    //   size: "sm",
    // });
    // modalRef.componentInstance.id = id;
    // modalRef.result.then(
    //   () => {
    //     this.deleteUser(id);
    //   },
    //   () => {}
    // );
  }
  deleteUser(id: number) {
    debugger;
    // this.userService.Delete_User(id).subscribe((res: any) => {
    //   if (res.success) {
    //     this.toastr.success(res.message);
    //     this.getallUser();
    //   } else {
    //   }
    // });
  }
}
