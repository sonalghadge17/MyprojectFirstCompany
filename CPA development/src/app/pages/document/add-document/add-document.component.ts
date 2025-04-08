import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import * as XLSX from 'xlsx';
import { Documentt } from '../document';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare const $: any;
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.scss'
})
export class AddDocumentComponent {
  @Input() documentType:any

  fileOfImages: File[] = [];
  fromDate: any;
  formGroup!: FormGroup;
  @Input() id!: any;
  @Input() data!: any;
  document!: Documentt;
  subcategoryList: any;
  categoryList: any;
  categoryId!: number;
  subcategoryId!: number;
  formData!: FormData;
  address!: string;
  lat: any;
  lng: any;
  reqBody:any
  imgChangeEvt: any = "";
  file2: any;
  file2Error: any
  file: any;
  image:any
  display: any;
  selectedFile!: File;
  cropImgPreview: any;
  fileErr!: any;
  imgurl: string | null | ArrayBuffer = "../../../../../assets/images/avatars/avtar.png";
  event: any;
  stateCode: any;
  states: any[] = [];
  cities: any[] = [];
  talukas:any[]=[]
  countryCode: any;
  taluka: any
  logoFile: any;
  bannerImageFile: any
  requestB:any
  public isDataEmpty: any;
  Bannerfile: any;
  subCategoryId: any;
  public search: string = "";
  itemsPerPage = 10;
  pageNo = 1;
  requestBody!: {
  isPagination: number;
  fromDate: string;
  toDate: string;
  searchTerm: any;
  orderBy:"DESC",
  pageNo: number;
  pageSize: number;
  sortBy: string;
  categoryId:any
};
userList:any
url: any;
  status: any
  role: any;
  currentUser:any
  userId: any;
  removedIds: string[] = [];
  showError: boolean=false;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public documentService: DocumentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
    private authFackservice: AuthfakeauthenticationService
  ) {
    this.currentUser = this.authFackservice.currentUserValue;
  }

  ngOnInit(): void {
    debugger
    // this.userId = this.currentUser.id;
    this.document = new Documentt();
    this.document.clear();
    this.getAllUser()
    this.loadForm();
    if(this.id){
      this.DocumentGetById();
    }
  
  }

  customSearchFunction(term: string, item: any): boolean {
    if (!term) {
      return true;
    }
    term = term.toLowerCase();
    return (
      item.firstName.toLowerCase().includes(term) ||
      item.lastName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term)
    );
  }
  getAllUser() {
    debugger
    let requestBody = {
        isPagination: 0,
        pageNo: this.pageNo - 1,
        pageSize: this.itemsPerPage,
        orderBy: "id",
        sortBy: "lastModifiedDate",
        searchTerm: this.search,
        status: "ACTIVE",
        role: this.role || "",
    }
    this.spinner.show();
    const sbGetAll = this.documentService
      .getallUser(requestBody)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.userList = res.data;
            // this.formGroup.get("userId")?.setValue(res.data.userId);   
          } else {
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error);
        }
      );
  }
  validateImages() {
    this.showError = this.images.length === 0;
  }
  onSelect(event: any): void {
    debugger
    // this.validateImages(); // Trigger validation
    const newFiles = event.addedFiles;

    const filePromises = newFiles.map((file: any) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const fileData: any = {
        file: file,
        extension: fileExtension,
        fullUrl: URL.createObjectURL(file), // Object URL for preview
      };

      // Handle Excel files
      if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        return this.parseExcelFile(file).then((excelData) => {
          fileData.excelData = excelData;
          return fileData;
        });
      }

      // For other files, return immediately
      return Promise.resolve(fileData);
    });

    // Wait for all file promises to resolve
    Promise.all(filePromises).then((resolvedFiles) => {
      // this.images = [...this.images, ...resolvedFiles];
      this.images = [...this.images, ...resolvedFiles];
      this.newFilesData = [...this.newFilesData, ...resolvedFiles]; // Track only newly added files
    });
  }

    // Helper method to parse Excel files
    private parseExcelFile(file: File): Promise<any[]> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
      });
    }
  onRemove(file: { id: string }): void {
    debugger;
    
    // Track the ids of removed files
     this.removedIds;
  
    // Filter out the removed file based on id and push the id to removedIds array
    this.images = this.images.filter((item: any) => {
      if (item.id === file.id) {
        this.removedIds.push(item.id); // Store the removed item's id
        return false; // Remove the item from the array
      }
      return true; // Keep the item in the array
    });
  
    // Log the removed ids (can be used to do something else like a server request)
    console.log('Removed file(s) with ID:', this.removedIds);
  
    // Revoke the object URL if the file has a valid id
    if (file.id) {
      URL.revokeObjectURL(file.id);
    }
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  save(){
    debugger
    if (this.id) {
      this.Update_Document();
    } else {
      this.Save_Document();
    }
  }
  Save_Document() {
    debugger;
    if (this.formGroup.valid) {
      this.prepareRequestData();
      debugger 
      const requestData = {
        description: this.formGroup.get('description')?.value,
        name: this.formGroup.get('name')?.value,
        userId: this.formGroup.get('SelecteduserId')?.value,
        type: 'ADMIN',
        documentType: this.documentType
      };
      const jsonString = JSON.stringify(requestData);
      const apiCall = this.documentService.Save_Document(this.requestB,jsonString);
      this.spinner.show();
      apiCall.subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.modal.close();
            this.toastr.success(res.message);
            this.formGroup.reset(); 
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err: any) => {
          this.spinner.hide();
          this.toastr.error(err);
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
  // Update_Document() {
  //   debugger;
  //   if (this.formGroup.valid) {
  //     // Prepare the request data
  //     this.prepareRequestDataUpdate();
  //     debugger;
  //     const requestData = {
  //       description: this.formGroup.get('description')?.value,
  //       name: this.formGroup.get('name')?.value,
  //       userId: this.formGroup.get('SelecteduserId')?.value,
  //       type: 'ADMIN',
  //       documentType: 'DOCUMENT',

  //     };
      
  //     const jsonString = JSON.stringify(requestData); 
  //     const apiCall = this.documentService.Update_Document(this.id, this.requestB, jsonString);
  //     this.spinner.show(); 
  //     apiCall.subscribe({
  //       next: (res: any) => {
  //         this.spinner.hide(); 
  //         if (res.success) {
  //           this.modal.close(); 
  //           this.toastr.success(res.message); 
  //           this.formGroup.reset();
  //         } else {
  //           this.toastr.error(res.message); 
  //         }
  //       },
  //       error: (err: any) => {
  //         this.spinner.hide(); // Hide the spinner on error
  //         console.error('Error updating document:', err);
  //         this.toastr.error('Something went wrong.'); // Show generic error message
  //       },
  //     });
  //   } else {
  //     // Mark all form controls as touched to display validation errors
  //     this.formGroup.markAllAsTouched();
  //   }
  // }
  newFilesData: any[] = []
  handleFileIdRemoval(deleteFileId:any) {
    debugger
  this.documentService.Delete_DocumentFile(deleteFileId).subscribe(
   
      (res: any) => {
        debugger
        if (res.success) {
          // this.attachments.splice(index, 1);
          // this.toastr.success(res.message);
          // this.BusinessgetById();
        } else {
          this.toastr.error(res.message);
        }
        },
      (error) => {
        this.toastr.error(error);
        // this.isLoading = false;
      }
    );
  }
  
  // Function to handle multiple ids removal
 
  Update_Document() {
    debugger;
    if (this.removedIds) {
      // Call function for single id removal
      this.handleFileIdRemoval(this.removedIds);
    }

    if (this.formGroup.valid) {
      this.prepareRequestDataUpdate();
      const formData = new FormData();
      const requestData = {
        description: this.formGroup.get('description')?.value,
        name: this.formGroup.get('name')?.value,
        userId: this.formGroup.get('SelecteduserId')?.value,
        type: 'ADMIN',
        documentType: this.documentType
      };
      formData.append('documentRequestJson',JSON.stringify(requestData));
      if (this.id) {
        for (let i = 0; i < this.newFilesData.length; i++) {
          formData.append('documents', this.newFilesData[i].file);
        }
      } else {
        for (let i = 0; i < this.images.length; i++) {
          formData.append('documents', this.images[i].file);
        }
      }
      const apiCall = this.documentService.Update_Document(this.id, formData);
      this.spinner.show(); 
      apiCall.subscribe({
        next: (res: any) => {
          this.spinner.hide(); 
          if (res.success) {
            this.modal.close(); 
            this.toastr.success(res.message); 
            this.formGroup.reset();
          } else {
            this.toastr.error(res.message); 
          }
        },
        error: (err: any) => {
          this.spinner.hide();
          console.error('Error updating document:', err);
          this.toastr.error(err); 
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
  
  
  attachments!: any[];
  images:any[]=[]
  DocumentGetById() {
    debugger;
    this.spinner.show();
    this.documentService.GetByID_Document(this.id).subscribe((res: any) => {
      this.spinner.hide();
      if (res.success === true) {
        this.document = res.data;
        this.formGroup.get("name")?.setValue(res.data.name);
        this.formGroup.get("description")?.setValue(res.data.description);
        // userId: this.formGroup.get('SelecteduserId')?.value,
        this.formGroup.get("SelecteduserId")?.setValue(res.data.userId);
        this.attachments = [];
        this.images = [];
        res.data.userDocuments.forEach((file: any) => {
          if (file && typeof file.url === 'string') {
            const fileName = file.url.split('/').pop();  
            const fileExtension = fileName.split('.').pop()?.toLowerCase(); 
            const placeholderFile = new File([''], fileName, { type: this.getMimeType(fileExtension) });
            this.images.push({
              file: placeholderFile,      
              url: file.url,               
              extension: fileExtension,    
              name: fileName, 
              id:file.id,       
            });
          } else {
            console.warn('Invalid file object:', file);
          }
        });
        console.log(this.images, 'Updated images array');
      } else {
        console.error('Failed to retrieve document data');
      }
    },);
  }
  
  // Helper function to get mime type based on file extension
  getMimeType(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      pdf: '../../../../../assets/images/cpaImages/pdfSample.jpg',
      docx: '../../../../../assets/images/cpaImages/docSample1.png',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      txt: 'text/plain',
    };
    
    // Return the mime type or a default if unknown
    return mimeTypes[extension] || 'application/octet-stream';
  }
  




  removedocument(id: any, index: any) {
    debugger
    // this.businessService.removedocument(id).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.attachments.splice(index, 1);
    //       this.toastr.success(res.message);
    //       this.BusinessgetById();
    //     } else {
    //       this.toastr.error(res.message);
    //     }
    //     },
    //   (error) => {
    //     this.toastr.error("Something went wrong.");
    //     this.isLoading = false;
    //   }
    // );
  }

  // prepareRequestDataUpdate(){
  //   const requestData = {
  //     description: this.formGroup.get('description')?.value,
  //     name: this.formGroup.get('name')?.value,
  //    userId: this.formGroup.get('SelecteduserId')?.value,
  
  //     type: "ADMIN",
  //     documentType: "DOCUMENT"
  //   };
  //   const formGroupData: FormData = new FormData();
  //   formGroupData.append('documentRequestJson', JSON.stringify(requestData));
  //   if (this.image) {
  //     formGroupData.append('documents', this.image);
  //   }
  //   for (let i = 0; i < this.images.length; i++) {
  //     formGroupData.append('documents', this.images[i].file);
  //   }
  //   this.requestB = formGroupData; 
  // }

  prepareRequestDataUpdate() {
    debugger
    const requestData = {
        description: this.formGroup.get('description')?.value,
        name: this.formGroup.get('name')?.value,
        userId: this.formGroup.get('SelecteduserId')?.value,
        type: "ADMIN",
        documentType: this.documentType
    };
    const formData: FormData = new FormData();
    formData.append('documentRequestJson', JSON.stringify(requestData));
    if (this.id) {
     
        for (let i = 0; i < this.newFilesData.length; i++) {
            formData.append('documents', this.newFilesData[i].file);
        }
    } 
    
    this.requestB = formData;
}
  prepareRequestData() {
    debugger;
    const requestData = {
      description: this.formGroup.get('description')?.value,
      name: this.formGroup.get('name')?.value,
      userId: this.formGroup.get('SelecteduserId')?.value,
      type: "ADMIN",
      documentType:this.documentType
    };
    const formGroupData: FormData = new FormData();
    formGroupData.append('documentRequest', JSON.stringify(requestData));
    if (this.image) {
      formGroupData.append('documents', this.image);
    }
    for (let i = 0; i < this.images.length; i++) {
      formGroupData.append('documents', this.images[i].file);
    }
    this.requestB = formGroupData; 
  }
  loadForm() {
    this.formGroup = this.fb.group({
      description: [
        this.document.description,
        Validators.compose([Validators.required]),
      ],
      name: [
        this.document.name,
        Validators.compose([Validators.required]),
      ],
      SelecteduserId:[this.document.SelecteduserId]
    });
  }
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation: any, controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}

