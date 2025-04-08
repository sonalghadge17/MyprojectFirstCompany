import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Jobs } from '../jobs';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { JobsService } from '../jobs.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrl: './add-jobs.component.scss'
})
export class AddJobsComponent {

  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: {
      items: [
        'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
        'undo', 'redo' // Remove 'image' from here to hide the image button
      ]
    }
  };
  formGroup!: FormGroup;
  @Input() id!: any;
  jobs!: Jobs;
 
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
fromDate: any;
toDate: any;
lastDateOfApply: any;
closeDate: any;
  today: {
    year: number; month: number; // Months are 0-based in JavaScript
    day: number;
  };
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public jobsService: JobsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
  private datePipe: DatePipe,
  ) {
    const currentDate = new Date();
    this.today = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1, // Months are 0-based in JavaScript
      day: currentDate.getDate()
    };

  }

  ngOnInit(): void {
    this.jobs = new Jobs();
    this.jobs.clear();
    this.loadForm();
   if(this.id){
    this.FAQS_By_Id();
   }
    
  }
 
  
  save() {
    debugger
    if (this.id) {
      this.updateData();
    } else {
      this.saveData();
    }
  }
  Changelastdate() {
    debugger
    let data = this.formGroup.value
    this.lastDateOfApply = this.datePipe.transform(new Date(data.lastDateOfApply.year, data.lastDateOfApply.month - 1, data.lastDateOfApply.day), 
      'dd-MM-yyyy'
    );
    
    
  }
  Changeclosedate() {
    debugger
    this.closeDate = this.datePipe.transform(new Date(this.closeDate.year, this.closeDate.month - 1, this.closeDate.day), 
    'dd-MM-yyyy'
  );
   
  }
  saveData() {
    debugger;
    let data = this.formGroup.value
    // this.Changelastdate()
    // const formattedLastDateOfApply = this.datePipe.transform(
    //   new Date(data.lastDateOfApply.year, data.lastDateOfApply.month - 1, data.lastDateOfApply.day),
    //   'dd-MM-yyyy'
    // );
    // this.Changeclosedate()
    let obj={
      ...data,
       lastDateOfApply: this.lastDateOfApply,
       
     };
  
    // let obj = this.formGroup.value
    this.spinner.show();
    this.jobsService.Save_Jobs(obj).subscribe(
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
  changeFromDate() {
    const fromDate = this.formGroup.get('fromDate')?.value;
    console.log('From Date Changed:', fromDate);
  }

  changeToDate() {
    const toDate = this.formGroup.get('toDate')?.value;
    console.log('To Date Changed:', toDate);
  }
  // Changeformdate() {
  //   debugger

  //   this.requestBody.fromDate = this.datePipe.transform(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day), 
  //     'yyyy-MM-dd'
  //   );
    
   
  // }
  // Changetodate() {
  //   debugger
  //   this.requestBody.toDate = this.datePipe.transform(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day), 
  //   'yyyy-MM-dd'
  // );
   
  // }
  //getbyid
  FAQS_By_Id() {
    debugger;
    this.spinner.show();
    const sb = this.jobsService.Jobs_By_Id(this.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res.data);
        if (res.success) {
          debugger;
          this.jobs = new Jobs();
          this.jobs.clear();
          this.jobs = res.data
          this.loadForm()
          this.formGroup.get("lastDateOfApply")?.setValue(this.convertToNgbDate(res.data.lastDateOfApply));
          // this.formGroup.get("description")?.setValue(res.data.description);
          // this.formGroup.get("experience")?.setValue(res.data.experience);
        }
      },
      (error: any) => {
        this.spinner.hide();
        console.error("Error loading institute details", error);
      }
    );
  }
  convertToNgbDate(dateString: string): NgbDateStruct | null {
    if (!dateString) return null;
    
    const [day, month, year] = dateString.split('-').map(Number); // Split and convert to numbers
    return {
      year: year,
      month: month,
      day: day
    };
  }
  updateData() {
    debugger;
    let data = this.formGroup.value
   let obj={
      ...data,
       lastDateOfApply: this.lastDateOfApply,
       id:this.id
     };
    //  let obj = this.formGroup.value
    this.spinner.show();
    this.jobsService.Update_Jobs(this.id, obj).subscribe(
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
    this.formGroup = this.fb.group(
      {
        description: [this.jobs.description, Validators.required],
        jobPosition: [this.jobs.jobPosition, Validators.required],
        experience: [this.jobs.experience, Validators.required],
        noOfVacancy: [this.jobs.noOfVacancy, Validators.required],
        qualification: [this.jobs.qualification, Validators.required],
        startSalary: [this.jobs.startSalary, Validators.required],
        lastSalary: [this.jobs.lastSalary, Validators.required],
        lastDateOfApply: [this.lastDateOfApply, Validators.required]
      },
      { validators: this.salaryRangeValidator.bind(this) } // Custom validator added here
    );
  }
  salaryRangeValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const startSalary = group.get('startSalary')?.value;
    const lastSalary = group.get('lastSalary')?.value;
    if (lastSalary !== null && startSalary !== null && lastSalary < startSalary) {
      return { salaryRangeInvalid: true };
    }
    return null;
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



