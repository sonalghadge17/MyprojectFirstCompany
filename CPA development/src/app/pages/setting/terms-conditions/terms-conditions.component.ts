import { Component } from '@angular/core';
import { SettingService } from '../setting.service';
import { TermsCondition } from './terms-condition';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {
  formGroup2!:FormGroup;
  formData!: FormData;
  TermsCondition!:TermsCondition
  public Editor = ClassicEditor;
  requestData: any;
  datalist: any;
  ids: any;
  id: any;
  public editorConfig = {
    toolbar: {
      items: [
        'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
        'undo', 'redo' // Remove 'image' from here to hide the image button
      ]
    }
  };
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toster: ToastrService, 
    public settingService:SettingService
  ) {}
  ngOnInit(): void {
    this.TermsCondition = new TermsCondition();
    this.TermsCondition.clear();
    this.loadForm();
    this.getall()
  }
  getall(){
    debugger
    this.settingService.getAllTerms_Conditions().subscribe((res:any)=>{
          if (res.success) {
            debugger
            this.datalist = res.data;
           this.id = this.datalist[0].id
              this.TermsCondition = this.datalist[0];
              this.loadForm();
            
        }
      }),(error:any) => {
        //  this.spinner.hide();
         this.toster.error(error);
       }
  } 
  loadForm() {
    this.formGroup2 = this.fb.group({
      
      termsAndCondition: [ this.TermsCondition.termsAndCondition,Validators.compose([Validators.required]),],
    });
  }
  prepareData() {
    // let obj;
 
   
  }
  saveabout() {
    if (this.id) {
      this.update();  // Call update if id is present
    } else {
      this.save();  // Call save if id is not present
    }
  }
  // save() {
  //   debugger;
  //   let obj = { 
  //     id: '',
  //     termsAndCondition: this.formGroup2.get("termsAndCondition")?.value };
  //   this.settingService.Savetermsandcondition(obj).subscribe((res: any) => {
  //     if (res.success) {
  //       this.toster.success(res.message);
  //       this.getall()
  //     } else {this.toster.error(res.message);}
  //   });
  // }
  // update() {
  //   debugger;
  //   let obj = { 
  //     id: this.id,
  //     termsAndCondition: this.formGroup2.get("termsAndCondition")?.value };
  //   this.settingService.Savetermsandcondition(obj).subscribe((res: any) => {
  //     if (res.success) {
  //       this.toster.success(res.message);
  //       this.getall()
  //     } else {this.toster.error(res.message);}
  //   });
  // }

  save() {
    debugger;
    let obj = { 
      id: '',
      termsAndCondition: this.formGroup2.get("termsAndCondition")?.value
    };
  
    this.settingService.Savetermsandcondition(obj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toster.success(res.message);
          this.getall();
        } else {
          this.toster.error(res.message || 'Failed to save terms and conditions.');
        }
      },
      error: (err) => {
        if (err.status === 403) {
          this.toster.error(err);
        } else {
          this.toster.error(err);
        }
      }
    });
  }
  
  update() {
    debugger;
    let obj = { 
      id: this.id,
      termsAndCondition: this.formGroup2.get("termsAndCondition")?.value
    };
  
    this.settingService.Savetermsandcondition(obj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toster.success(res.message);
          this.getall();
        } else {
          this.toster.error(res.message || 'Failed to update terms and conditions.');
        }
      },
      error: (err) => {
        if (err.status === 403) {
          this.toster.error(err);
        } else {
          this.toster.error(err);
        }
      }
    });
  }
  
}


