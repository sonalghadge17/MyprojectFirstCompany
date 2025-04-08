import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { News } from '../news';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.scss'
})
export class AddNewsComponent {
  formGroup!: FormGroup;
  @Input() id!: any;
  news!: News;
  public Editor = ClassicEditor;
  formData!: FormData;
public search: string = "";
  requestB:any
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public newsService: NewsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,

  ) {}

  ngOnInit(): void {
    this.news = new News();
    this.news.clear();
    this.loadForm();
   
    this.News_By_Id();
  }
 
  
  save() {
    debugger
    if (this.id) {
      this.updateData();
    } else {
      this.saveData();
    }
  }
  saveData() {
    debugger;
    let obj = {
      description: this.formGroup.get("description")?.value,
      label: this.formGroup.get("label")?.value,
    };
    this.spinner.show();
    this.newsService.Save_News(obj).subscribe(
      (res: any) => {
        if (res.success === true) {
          this.toastr.success(res.message);
          this.spinner.hide();
          this.modal.dismiss();
        } else {
          this.toastr.error(res.message);
          this.spinner.hide();
        }
      },
      (error: any) => {
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }


  //getbyid
  News_By_Id() {
    debugger;
    this.spinner.show();
    const sb = this.newsService.News_By_Id(this.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res.data);
        if (res.success) {
          debugger;
          this.news = new News();
          this.news.clear();
          this.news = res.data
          this.formGroup.get("description")?.setValue(res.data.description);
          this.formGroup.get("label")?.setValue(res.data.label);
         
        }
      },
      (error: any) => {
        this.spinner.hide();
        console.error("Error loading institute details", error);
      }
    );
  }
  updateData() {
    debugger;
    let obj = {
      id: this.id, 
      description: this.formGroup.get("description")?.value,
      label: this.formGroup.get("label")?.value,
    };
    this.spinner.show();
    this.newsService.Update_News(this.id, obj).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.modal.close();
        } else {
          this.toastr.error(res.message);
          this.modal.close();
        }
      },
      (error) => {
        this.spinner.hide();
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error(error);
        }
      }
    );
  }

  manageData() {
    debugger;
    const formData = this.formGroup.value;
    delete formData.confirm;
  }
  loadForm() {
    this.formGroup = this.fb.group({
      description: [
        this.news.description,
        Validators.compose([Validators.required]),
      ],
    
      label: [
        this.news.label,
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
}
