import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../music.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-musician-management',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,FormsModule,
    
  ],
  templateUrl: './musician-management.component.html',
  styleUrl: './musician-management.component.scss'
})
export class MusicianManagementComponent {
  // gridjsList: Observable<undefined> | Subscribable<undefined> | Promise<undefined> | undefined;
  ProgramList: any;
  date: any;
  requestBody:any;
    datalist: any;
    public search: string = "";
    itemsPerPage = 10;
    pageNo = 1;
    listLength: any;
    activeindex: any;
    datalistRequested: any;
    listLength1: string|number|undefined;
    pageNo1 = 1 ;
    itemsPerPage1 = 10;
    supplierList: any;
  selectedStatus: any;
  currentUser:any
  productModule:any={}
  selectedProductCategory: any;
  selectedSupplier: any;
    categoryList: any;
  selectedCategory: any;
  productStatus:any={}
    selectedcategoryId: any[]=[];
  constructor( private modalService: NgbModal,private authFackservice:AuthfakeauthenticationService,
     private toastr: ToastrService,private musicService:MusicService,private spinner: NgxSpinnerService){
    const today = new Date();
      this.date = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
  
  }
  }
  ngOnInit(): void {
    this.currentUser = this.authFackservice.currentUserValue;
   
    this.requestBody = {
      pageNo: this.pageNo - 1,
      pageSize: this.itemsPerPage,
      searchTerm: this.search,
      isPagination:1,
      sortBy:'createdDate',
      sortorder:'ASC',
      supplierId:'',
      categoryId:''
  
    };
    this.getAllMusician()
   
    }

  
  // Mock data fetching
  // getData() {
  //   return of([
  //     { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Manager', company: 'Company A', country: 'USA',Qty: '3',qr:'aa',status:'success', selected: false },
  //     { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Developer', company: 'Company B', country: 'UK', Qty: '3',qr:'',status:'pending',selected: false },
  //     { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Developer', company: 'Company B', country: 'UK', Qty: '3',qr:'',status:'close',selected: false },// Add more objects here...
  //   ]);
  // }
  
  
  onRowCheckboxChange(row: any) {
    console.log(`${row.name} checkbox changed: ${row.selected}`);
  }
  
  
  getAllMusician() {
    debugger
     this.spinner.show();
     this.musicService.getAllMusician(this.requestBody).subscribe(
         (res: any) => {
      
          // this.datalist = res.rows;
           if (res.success) {
             debugger
                  this.spinner.hide();
             this.datalist = res.data.content;
  
          
             this.listLength = res.data.totalElements;
           } else {
             this.toastr.error(res.message);
            //  this.spinner.hide();
           }
         },
         (error:any) => {
           this.spinner.hide();
           this.toastr.error(error);
         }
       );
     
   }
  
  
 
   resetData(){
    this.search=''
   }
   
  
  toggleStatus(productId: number, currentStatus: string) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Are you sure you want to deactivate the product?';
    modalRef.componentInstance.currentStatus = currentStatus;
    modalRef.result.then(
      (result) => {
        if (result && result.confirmed) {
          const newStatus = currentStatus === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE';
        
          this.musicService.approvedStatusMusician(productId).subscribe(
            (response: any) => {
              if (response.success) {
                this.toastr.success(response.message);
                this.getAllMusician();
              }
            },
            (error) => {
              this.toastr.error('Failed to update status');
            }
          );
        }
      },
      (reason) => {
        // Handle dismiss
      }
    ).finally(() => {
      this.getAllMusician();
    });
  }
   itemsPerPageChange($event: any) {
    this.itemsPerPage = parseInt($event.target.value);
    this.requestBody.pageSize = this.itemsPerPage;
    this.itemsPerPage;
    this.requestBody.pageNo = 0;
    this.getAllMusician();
  }
  pageNoChange($event: any) {
    this.pageNo = $event - 1;
    this.requestBody.pageNo = this.pageNo;
    this.getAllMusician();
  }
  onCategoryChange(selectedCategory: any): void {
    debugger
    if (Array.isArray(selectedCategory) && selectedCategory.length > 0) {
      this.selectedcategoryId = selectedCategory.map(category => category.id);
      // console.log(selectedcategoryId)
    } else {
      this.requestBody.categoryId = [];
    }
    // console.log('Selected Category:', selectedCategory);
    this.requestBody.categoryId = this.selectedcategoryId
    this.getAllMusician()
     // Handle logic here
  }
 
  // for pagination
  
  //searchevent
  searchevent($event: any) {
    // this.requestBody.isPagination = 1;
    this.requestBody.searchTerm = $event.target.value;
    this.getAllMusician();
  }
  
  
  
  
  }
  