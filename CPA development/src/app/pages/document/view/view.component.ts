import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../document.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  @Input() item: any;
  public search: string = "";
  document: any;

  reporttlist:any
  reportlist:any
  itemsPerPage = 10;
  pageNo = 1;
  listLength: any;
  requestBody: any
documentData: any;
file: any;
  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public modal: NgbActiveModal,
    private documentService:DocumentService,
    private fb: FormBuilder,
   ) {
    }
  ngOnInit(): void {
    debugger
    console.log(this.item)
  }
//   downloadDocument(item: any) {
//     debugger
//     this.documentService.downloadZip(item.id);   
// }
downloadAllAsZip(documentId: string) {
 
  this.documentService.DownloadZip(documentId)
}
downloadFile(documentId:any) {
   
    this.documentService.downloadDocument(documentId);
  }
  // downloadDocument(file: any): void {
  //   if (!file || !file.id || !file.url) {
  //     console.error("Invalid file data:", file);
  //     return;
  //   }
  //   const list = file.url.split('/');
  //   const key = list[list.length - 1];
  
  //   this.documentService.downloadDocument(file.id, key)
  //     // (response: any) => {
  //     //   const blob = new Blob([response], { type: response.type });
  //     //   const downloadUrl = window.URL.createObjectURL(blob);
  //     //   const link = document.createElement('a');
  //     //   link.href = downloadUrl;
  //     //   link.download = key;
  //     //   link.click();
  //     //   window.URL.revokeObjectURL(downloadUrl);
  //     // },
  //     // (error) => {
  //     //   console.error("Error downloading file:", error);
  //     // }
  //   // );
  // // }

// }
}
