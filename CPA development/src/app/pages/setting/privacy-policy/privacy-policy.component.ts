import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PrivacyPolicy } from './privacy-policy';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  formGroup2!:FormGroup;
  formData!: FormData;
  privacyPolicy!:PrivacyPolicy
  public Editor = ClassicEditor;
  requestData: any;
  public editorConfig = {
    toolbar: {
      items: [
        'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
        'undo', 'redo' // Remove 'image' from here to hide the image button
      ]
    }
  };
  datalist: any;
  ids: any;
  id: any;
 
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toster: ToastrService, 
    public settingService:SettingService
  ) {}
  ngOnInit(): void {
    this.privacyPolicy = new PrivacyPolicy();
    this.privacyPolicy.clear();
    this.loadForm();
    this.getall()
  }
  getall(){
    debugger
    this.settingService.getAllPrivacyPolicy().subscribe((res:any)=>{
          if (res.success) {
            this.datalist = res.data;
            this.id = this.datalist[0].id
              this.privacyPolicy = this.datalist[0];
              this.loadForm();
            
        }
      })
  }
   
  loadForm() {
    this.formGroup2 = this.fb.group({
      id:[ this.privacyPolicy.id],
      privacyPolicy: [ this.privacyPolicy.privacyPolicy,Validators.compose([Validators.required]),],
    });
  }
  prepareData() {
    let obj;
    obj = { 
      id: '',
      privacyPolicy: this.formGroup2.get("privacyPolicy")?.value };
    this.requestData = obj;
  }
  saveprivacypolicy() {
    if (this.id) {
      this.update();  // Call update if id is present
    } else {
      this.save();  // Call save if id is not present
    }
  }
  // save() {
  //   debugger;
  //  let  obj = { 
  //     id: '',
  //     privacyPolicy: this.formGroup2.get("privacyPolicy")?.value }
  //   this.settingService.Saveprivacy_policy(obj).subscribe((res: any) => {
  //     if (res.success) {
  //       this.toster.success(res.message);
  //       this.getall()
  //     } else {this.toster.error(res.message);}
  //   });
  // }
  // update() {
  //   debugger;
  //  let  obj = { 
  //     id: this.id,
  //     privacyPolicy: this.formGroup2.get("privacyPolicy")?.value }
  //   this.settingService.Saveprivacy_policy(obj).subscribe((res: any) => {
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
      privacyPolicy: this.formGroup2.get("privacyPolicy")?.value 
    };
  
    this.settingService.Saveprivacy_policy(obj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toster.success(res.message);
          this.getall();
        } else {
          this.toster.error(res.message || 'Failed to save privacy policy.');
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
      privacyPolicy: this.formGroup2.get("privacyPolicy")?.value 
    };
  
    this.settingService.Saveprivacy_policy(obj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toster.success(res.message);
          this.getall();
        } else {
          this.toster.error(res.message || 'Failed to update privacy policy.');
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


