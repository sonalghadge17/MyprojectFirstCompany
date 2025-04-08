import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-veiw-contact',
  templateUrl: './veiw-contact.component.html',
  styleUrl: './veiw-contact.component.scss'
})
export class VeiwContactComponent {
  @Input() item: any;
  public search: string = "";
  businesses: any;
  data: any;
  reporttlist:any
  reportlist:any
  itemsPerPage = 10;
  pageNo = 1;
  listLength: any;
  requestBody: any
  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private settingService:SettingService,
    private fb: FormBuilder,
   ) {
   
    }
  ngOnInit(): void {
    console.log(this.item)
    // this.getAllReport()
  }
  // getAllReport() {
  //   this.spinner.show();
  //   this.requestBody = {
  //     isPagination: 1,
  //     pageNo: this.pageNo - 1,
  //     pageSize: this.itemsPerPage,
  //     searchTerm: this.search,
  //     sortBy: "id",
  //     orderBy: "DESC",
  //     fromDate: "",
  //     toDate: "",
  //     userId: "0"
  //   };
  //   const sbGetAll = this.reportService.GetAllReportByPagination(this.requestBody).subscribe(
  //     (response: any) => {
  //       this.reporttlist = response.data.users;  
  //       this.listLength = response.data.totalBusinessCount; 
  //     },
  //     (error: any) => {
  //       // Handle error here
  //       console.error("Error fetching report data:", error);
  //     }
  //   );
  // }
}