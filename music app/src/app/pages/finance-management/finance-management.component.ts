import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ToastrService } from 'ngx-toastr';
import { MusicService } from '../music.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-finance-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-management.component.html',
  styleUrl: './finance-management.component.scss'
})
export class FinanceManagementComponent {
  currentUser: any;
  requestBody:any;
  public search: string = "";
  itemsPerPage = 10;
  pageNo = 1;
  listLength: any;
  date: { year: number; month: number; day: number; };
  datalist: any;
   constructor( private modalService: NgbModal,private authFackservice:AuthfakeauthenticationService, 
    private toastr: ToastrService,private musicService:MusicService, private spinner: NgxSpinnerService){
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
      sortBy:'createdOn',
      sortorder:'ASC',
      supplierId:'',
      categoryId:''
  
    };
    this.getAllFinance()
  }
  getAllFinance() {
    debugger
    this.spinner.show();
     this.musicService.getAllFinance().subscribe(
         (res: any) => {
           this.spinner.hide();
          let data = res.data;
this.datalist = data
          //  if (res.success) {
          //    debugger
          //    this.datalist = res.data.content;
  
          
          //    this.listLength = res.data.totalElements;
          //  } else {
          //    this.toastr.error(res.message);
          //   //  this.spinner.hide();
          //  }
         },
         (error:any) => {
           this.spinner.hide();
           this.toastr.error(error);
         }
       );
     
   }
  
  
}
