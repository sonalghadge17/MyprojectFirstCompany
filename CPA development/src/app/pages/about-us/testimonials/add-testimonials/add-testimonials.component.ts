import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestimonialService } from '../testimonial.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Testimonial } from '../testimonial';
@Component({
  selector: 'app-add-testimonials',
  templateUrl: './add-testimonials.component.html',
  styleUrl: './add-testimonials.component.scss'
})
export class AddTestimonialsComponent {
  formGroup!: FormGroup;
  @Input() id!: any;
  testimonial!: Testimonial;
  formData!: FormData;
  public Editor = ClassicEditor;
  file2: any;
  file2Error: any
  file: any;
  display: any;
  selectedFile!: File;
  cropImgPreview: any;
  fileErr!: any;
  event: any;
  imgurl: string | null | ArrayBuffer = "../../../../../assets/images/avatars/avtar.png";
  requestB: any;
  maxLength=187;


  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public testimonialService: TestimonialService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private cd:ChangeDetectorRef
  ) {   }

  ngOnInit(): void {
    this.testimonial = new Testimonial();
    this.testimonial.clear();
    this.loadForm();
    if(this.id){
      this.BusinessgetById();
    }
   
    this.formGroup.get('description')?.valueChanges.subscribe((value) => {
      if (value && value.length > this.maxLength) {
        console.warn('Content exceeds the maximum allowed length.');
      }
    });
  }
  editorConfig = {
    height: '200px', // Set a fixed height for the editor
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      'blockQuote',
      '|',
      'undo',
      'redo',
    ],
  };
  uploadFileForLogo($event: any) {
    if ($event.target.name == 'logo') {
      let file = $event.target.files[0];
      this.file = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgurl = reader.result;
      }
    }
  }
  RemoveLogoUrl() {
    this.file = null!;
    this.imgurl = '../../../../assets/images/profile_avatar.jpg'
  }
  onCloseHandled() {
    // this.file = null;
    this.event.target.value = "";
    this.imgurl = "";
    // $("#profilePhoto").html("");
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
    this.manageData(); 
    this.spinner.show(); 
  
    this.testimonialService.Save_Testimonial(this.requestB).subscribe(
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
  // Update_Business() {
  //   debugger
  //   this.manageDataUpdate(); 
  //   this.testimonialService.Update_Testimonial(this.requestB).subscribe((res: any) => {
  //     this.spinner.hide();
  //     if (res.success) {
  //       this.toastr.success(res.message);
  //       this.modal.close();
  //     } else {
  //       this.toastr.error(res.message);
  //     }
  //   });
  // }


  Update_Business() {
    debugger;
    this.manageDataUpdate();
    this.testimonialService.Update_Testimonial(this.requestB).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.modal.close();
        } else {
          this.toastr.error(res.message || 'Failed to update business.');
        }
      },
      error: (err) => {
        this.spinner.hide();
        if (err.status === 403) {
          this.toastr.error(err);
        } else {
          this.toastr.error(err);
        }
      }
    });
  }
  
  attachments!: any[];
  images:any
  BusinessgetById() {
    debugger
    this.spinner.show();
    this.testimonialService.Testimonial_By_Id(this.id).subscribe((res: any) => {
      this.spinner.hide();
      if (res.success == true) { 
        debugger
      this.testimonial = res.data;
      this.formGroup.get("clientName")?.setValue(res.data.clientName);
      this.formGroup.get("clientDesignation")?.setValue(res.data.clientDesignation);
      this.formGroup.get("description")?.setValue(res.data.description);
      this.imgurl= res.data.picture;
    }})
  }

  manageData() {
    debugger;
    let requestData = {
      clientName: this.formGroup.get("clientName")?.value,
      clientDesignation:this.formGroup.get("clientDesignation")?.value,
      description: this.formGroup.get("description")?.value,
    };
    let formGroupData: FormData = new FormData();
    formGroupData.append('testimonialsRequest', JSON.stringify(requestData));
    formGroupData.append('picture', this.file);
  
    this.requestB = formGroupData;
  }

  manageDataUpdate() {
    debugger;
    let requestData = {
      id:this.id,
      clientName: this.formGroup.get("clientName")?.value,
      clientDesignation:this.formGroup.get("clientDesignation")?.value,
      description: this.formGroup.get("description")?.value,
    };
    let formGroupData: FormData = new FormData();
    formGroupData.append('testimonialsRequest', JSON.stringify(requestData));
    formGroupData.append('picture', this.file);
  
    this.requestB = formGroupData;
  }
  loadForm() {
    this.formGroup = this.fb.group({
      clientName: [
        this.testimonial.clientName,
        Validators.compose([Validators.required]),
      ],
  
      clientDesignation: [
        this.testimonial.clientDesignation,
        Validators.compose([Validators.required]),
      ],
      description: [
        this.testimonial.description,
        Validators.compose([Validators.required]),
      ],
    
    });
  }
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  // maxLengthValidator(control: any) {
  //   if (control.value && control.value.length > this.maxLength) {
  //     return { maxLengthExceeded: true };
  //   }
  //   return null;
  // }

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
