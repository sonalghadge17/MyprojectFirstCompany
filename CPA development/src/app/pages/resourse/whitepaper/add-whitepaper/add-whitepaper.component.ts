import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { WhitepaperService } from '../whitepaper.service';
import { Whitepaper } from '../whitepaper';
declare const $: any;
import * as XLSX from 'xlsx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-whitepaper',
  templateUrl: './add-whitepaper.component.html',
  styleUrl: './add-whitepaper.component.scss'
})
export class AddWhitepaperComponent {
  fileOfImages: File[] = [];
  fromDate: any;
  formGroup!: FormGroup;
  @Input() id!: any;
  whitepaper!: Whitepaper;
  subcategoryList: any;
  categoryList: any;
  categoryId!: number;
  subcategoryId!: number;
  formData!: FormData;
  public Editor = ClassicEditor;
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
url: any;
  fileDocumet: any;
  maxLength =163;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public whitepaperService: WhitepaperService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.whitepaper = new Whitepaper();
    this.whitepaper.clear();
    this.loadForm();
    if(this.id){
      this.WhitePaperById();
    }
   
    this.formGroup.get('description')?.valueChanges.subscribe((value) => {
      if (value && value.length > this.maxLength) {
        console.warn('Content exceeds the maximum allowed length.');
      }
    });
  }

  fileChangeListener($event:any) {
    this.imgChangeEvt = $event;
    this.event = $event;
    let file = $event.target.files[0];
    this.file = file;
    this.openModal();
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }
  SaveCropedImage() {
    this.Condition();
    this.event.target.value = "";
    $("#profilePhoto").html("");
    this.display = "none";
  }
  Condition() {
    let name = this.file.name;
    let type = this.file.type;
    this.file = null;
    let imageAsBase64 = this.cropImgPreview.slice(22);
    var bytearray = this.base64ToByteArray(imageAsBase64);
    var file = new File([new Blob(bytearray)], name, { type: type });
    this.file = file;
    if (this.file.size <= 10485760) {
      $("#profilePhoto").html("");
      this.fileErr = false;
    } else {
      $("#profilePhoto").html(
        "The size of selected file is greater than 10 MB"
      );
      this.fileErr = true;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.file); 
    reader.onload = (event) => {
      this.imgurl = reader.result;
    };
  }
  
  base64ToByteArray(base64String:any) {
    try {
      var sliceSize = 1024;
      var byteCharacters = atob(base64String);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);
      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      console.log(byteArrays);
  
      return byteArrays;
    } catch (e) {
      console.log("Couldn't convert to byte array: " + e);
      return undefined;
    }
  } 
  openModal() {
    this.display = "block";
  }
  
  onCloseHandled() {
    this.file = null;
    this.event.target.value = "";
    this.imgurl = "";
    this.display = "none";
  }
  
  files: File[] = [];
  onSelect(event: any): void {
    debugger
    if (event.addedFiles && event.addedFiles.length > 0) {
      const selectedFile = event.addedFiles[0];
      this.fileDocumet = selectedFile
      const fileName = selectedFile.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
      this.images = [
        {
          file: selectedFile,
          url: '', 
          extension: fileExtension,
          name: fileName,
        }
      ];
    }
    
  }
  onRemove(item: any): void {
    // Clear the single file from the list
    this.images = [];
  }
  save(){
    debugger
 
    if (this.id) {
      this.Update_WhitePaper();
    } else {
      this.Save_WitePaper();
    }
  }
  Save_WitePaper() {
    debugger; 
    if (this.formGroup.valid) {
    this.prepareRequestData(); 
    this.spinner.show(); 
  
    this.whitepaperService.Save_White_Paper(this.requestB).subscribe(
      (res: any) => {
        if (res.success === true) {
          this.toastr.success(res.message);
          this.activeModal.dismiss();
        } else {
          this.toastr.error(res.message); 
        }
      },
      (error: any) => {
        this.toastr.error(error); 
        console.error(error);
      },
      () => {
        this.spinner.hide(); 
      }
    );
  }
}
  Update_WhitePaper() {
    debugger
    this.prepareRequestDataUpdate(); 
    this.whitepaperService.Update_White_Paper(this.requestB).subscribe((res: any) => {
      this.spinner.hide();
      if (res.success) {
        this.toastr.success(res.message);
        this.modal.close();
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  
  attachments!: any[];
  images:any
  WhitePaperById() {
    debugger;
    this.spinner.show();
    this.whitepaperService.WhitePaper_By_Id(this.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success === true) {
          this.whitepaper = res.data;
  
          // Set form values
          this.formGroup.get("label")?.setValue(res.data.label);
          this.formGroup.get("description")?.setValue(res.data.description);
  
          // Set image URL
          this.imgurl = res.data.image;
  
          // Initialize arrays
          this.attachments = [];
          this.images = [];
          this.file = [];
  
          // Handle file data
          if (res.data.file) {
            const fileUrl = res.data.file;
            const fileName = fileUrl.split('/').pop();
            const fileExtension = fileName?.split('.').pop()?.toLowerCase();
  
            // Create a placeholder file object
            const placeholderFile = new File([''], fileName || '', {
              type: this.getMimeType(fileExtension),
            });
  
            // Populate images array
            this.images = [
              {
                file: placeholderFile,
                url: fileUrl,
                extension: fileExtension,
                name: fileName,
              },
            ];
          }
  
          console.log(this.images, 'Updated images array');
        }
      },
      (error: any) => {
        this.spinner.hide();
        console.error('Error fetching whitepaper by ID:', error);
      }
    );
  }
      

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

  prepareRequestDataUpdate(){
    let requestData = {
      description: this.formGroup.get("description")?.value,
      label:this.formGroup.get("label")?.value,
      id: this.id
    };
    let formGroupData: FormData = new FormData();
    formGroupData.append('whitePaperRequest', JSON.stringify(requestData));
    formGroupData.append('file', this.fileDocumet);
    formGroupData.append('image', this.file);
  
    this.requestB = formGroupData;
  }
  prepareRequestData() {
   debugger
    let requestData = {
      description: this.formGroup.get("description")?.value,
      label:this.formGroup.get("label")?.value,
    };
    let formGroupData: FormData = new FormData();
    formGroupData.append('whitePaperRequest', JSON.stringify(requestData));
    formGroupData.append('file', this.fileDocumet);
    formGroupData.append('image', this.file);
    this.requestB = formGroupData;
  }
  loadForm() {
    this.formGroup = this.fb.group({
      description: [
        this.whitepaper.description,
        Validators.compose([Validators.required,this.maxLengthValidator.bind(this)]),
      ],
      label: [
        this.whitepaper.label,
        Validators.compose([Validators.required]),
      ],
     
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
  maxLengthValidator(control: any) {
    if (control.value && control.value.length > this.maxLength) {
      return { maxLengthExceeded: true };
    }
    return null;
  }
}

