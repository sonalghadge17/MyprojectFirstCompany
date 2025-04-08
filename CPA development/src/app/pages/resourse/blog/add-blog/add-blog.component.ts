import { Component, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BolgService } from '../bolg.service';
import { Blog } from '../blog';
declare const $: any;
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})
export class AddBlogComponent {
  url:any; 
  fromDate: any;
  formGroup!: FormGroup;
  @Input() id!: any;
  blog!: Blog;
  subcategoryList: any;
  categoryList: any;
  categoryId!: number;
  subcategoryId!: number;
  formData!: FormData;
  public Editor = ClassicEditor;
  address!: string;
  

  imgChangeEvt: any = "";
  file2: any;
  file2Error: any
  file: any;
  display: any;
  selectedFile!: File;
  cropImgPreview: any;
  fileErr!: any;
  imgurl!: any;
  event: any;
  stateCode: any;
public search: string = "";
  itemsPerPage = 10;
  pageNo = 1;
  image: any
  requestB:any
  public editor = ClassicEditor;  // CKEditor build (ensure you've imported the right build)
  public editorConfig = {
    toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote',  'undo', 'redo']
  };
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public bolgService: BolgService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,

  ) {}

  ngOnInit(): void {
    this.blog = new Blog();
    this.blog.clear();
    this.loadForm();
    if(this.id){
      this.BlogById();
    }
    
  }
 
  validateInput(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  fileChangeListener($event:any) {
    this.imgChangeEvt = $event;
    this.event = $event;
    let file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgurl = e.target.result; // Set imgurl to display image
    };
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
  save(){
    if (this.id) {
      this.Update_Business();
    } else {
      this.saveBusiness();
    }
  }
  saveBusiness() {
    debugger; 
    if (this.formGroup.valid) {
    this.manageData();
    this.spinner.show();
    this.bolgService.Save_Blog(this.requestB).subscribe(
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
  } }
  Update_Business() {
    debugger; 
    this.manageDataUpdate();
    this.spinner.show();
    this.bolgService.Update_Blog(this.requestB).subscribe(
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
  attachments!: any[];
  images:any
  BlogById() {
    debugger
    this.spinner.show();
    this.bolgService.Blog_By_Id(this.id).subscribe((res: any) => {
      this.spinner.hide();
      if (res.success == true) { 
        debugger
        this.blog = res.data
      this.formGroup.get("label")?.setValue(res.data.label);
      this.formGroup.get("description")?.setValue(res.data.description);
      this.imgurl= res.data.image;
      }})
  }
  manageDataUpdate() {
    debugger;
    let requestData = {
      id:this.id,
      description: this.formGroup.get("description")?.value,
      label:this.formGroup.get("label")?.value,  
    };
    let formGroupData: FormData = new FormData();
    formGroupData.append('blogRequest', JSON.stringify(requestData));
    formGroupData.append('image', this.file);
    this.requestB = formGroupData;
  }
  manageData() {
    debugger;
    let requestData = {
      description: this.formGroup.get("description")?.value,
      label:this.formGroup.get("label")?.value,  
    };
    let formGroupData: FormData = new FormData();
    formGroupData.append('blogRequest', JSON.stringify(requestData));
    formGroupData.append('image', this.file);
    this.requestB = formGroupData;
  }
  loadForm() {
    this.formGroup = this.fb.group({
      description: [
        this.blog.description,
        Validators.compose([Validators.required]),
      ],
      label: [ this.blog.label,
        Validators.compose([Validators.required]),],
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
