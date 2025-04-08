import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Faqs } from '../faqs';
import { FaqsService } from '../faqs.service';

@Component({
  selector: 'app-add-faqs',
  templateUrl: './add-faqs.component.html',
  styleUrl: './add-faqs.component.scss'
})
export class AddFaqsComponent {

  formGroup!: FormGroup;
  @Input() id!: any;
  faqs!: Faqs;
 
  formData!: FormData;
public search: string = "";
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
  requestB:any
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public faqsService: FaqsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,

  ) {}

  ngOnInit(): void {
    this.faqs = new Faqs();
    this.faqs.clear();
    this.loadForm();
   
    this.FAQS_By_Id();
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
      question: this.formGroup.get("question")?.value,
      answer: this.formGroup.get("answer")?.value,
    };
    this.spinner.show();
    this.faqsService.Save_Faqs(obj).subscribe(
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
  FAQS_By_Id() {
    debugger;
    this.spinner.show();
    const sb = this.faqsService.Faqs_By_Id(this.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res.data);
        if (res.success) {
          debugger;
          this.faqs = new Faqs();
          this.faqs.clear();
          this.faqs = res.data
          this.formGroup.get("question")?.setValue(res.data.question);
          this.formGroup.get("answer")?.setValue(res.data.answer);
         
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
      question: this.formGroup.get("question")?.value,
      answer: this.formGroup.get("answer")?.value,
    };
    this.spinner.show();
    this.faqsService.Update_Faqs(this.id, obj).subscribe(
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
      question: [
        this.faqs.question,
        Validators.compose([Validators.required]),
      ],
    
      answer: [
        this.faqs.answer,
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
