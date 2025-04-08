import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/services/date-picker.utils';
import { ProductService } from 'src/app/core/services/product.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { AssessmentReportClass } from 'src/app/shared/models/supplier-profile/assessment-report';
import { CertificatesClass } from 'src/app/shared/models/supplier-profile/certificates.model';
import { FactoryClass } from 'src/app/shared/models/supplier-profile/factory';
import { FarmClass } from 'src/app/shared/models/supplier-profile/farm';
import { LogisticsClass } from 'src/app/shared/models/supplier-profile/logistics';
import { ProductClass } from 'src/app/shared/models/supplier-profile/product';
import { ProfileClass } from 'src/app/shared/models/supplier-profile/profile.model';
import { TestReportClass } from 'src/app/shared/models/supplier-profile/test-report';
import { DealSuccessModalComponent } from '../../our-product/deal-now-modal/deal-success-modal/deal-success-modal.component';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.scss',
  providers: [DatePipe,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ProfileSettingComponent {
  accountSettingForm!: FormGroup;
  // selectedFile: any;
  imgurl: string | null | ArrayBuffer = '../../../../assets/account-setting-img.png';
  file!: File | Blob;

  // forms properties
  currentStep: number = 1;
  searchQuery: string = '';
  queryData: any;
  currentDate: any;
  currentUser: any;
  supplierDetails: any;
  steps = [
    'Supplier Details',
    'Certificates',
    'Factory',
    'Logistics',
    'Test Report',
    'Farm',
    'Product',
    'Assessment Report',
    'Working Doc',
    'Attachment'
  ];

  licenseTypes = [
    'Test'
  ]
  categoryList: any[] = [];

  selectedFile: any;
  testReportSelectedFile: any;
  farmSelectedFile: any;
  productTestReportSelectedFile: any;
  productCertiSelectedFile: any;
  productImgSelectedFile: any;
  workingDocSelectedFile: any;
  attachmentSelectedFile: any;

  selectedFileBase64: string | null = null;
  testReportSelectedFileBase64: string | null = null;
  farmSelectedFileBase64: string | null = null;
  productImgSelectedFileBase64: string | null = null;
  workingDocSelectedFileBase64: string | null = null;
  attachmentSelectedFileBase64: string | null = null;

  certificatesData: any[] = [];
  factoryData: any[] = [];
  testReportData: any[] = [];
  farmData: any[] = [];
  productData: any[] = [];
  workingDocData: any[] = [];
  attachementData: any[] = [];

  // all classes
  profileClass!: ProfileClass;
  certificatesClass!: CertificatesClass;
  factoryClass!: FactoryClass;
  logisticsClass!: LogisticsClass;
  testReportClass!: TestReportClass;
  farmClass!: FarmClass;
  productClass!: ProductClass;
  assessmentReportClass!: AssessmentReportClass;

  // all form-groups 
  profileFormGroup!: FormGroup;
  certificatesFormGroup!: FormGroup;
  factoryFormGroup!: FormGroup;
  logisticsFormGroup!: FormGroup;
  testReportFormGroup!: FormGroup;
  farmFormGroup!: FormGroup;
  productFormGroup!: FormGroup;
  assessReportFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    // private _hideshowservice: HideShowServiceService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private supplierService: SupplierService,
    private productService: ProductService,
    private authFakeService: AuthfakeauthenticationService
  ) {
    const currentUser = this.authFakeService.currentUserValue
    if (currentUser) {
      this.currentUser = currentUser;
    }
  }

  ngOnInit() {
    this.getCategory();
    this.loadAllForms();
    this.getDetailsById()
  }

  // get supplier details and set in form 
  getDetailsById() {
    this.supplierService.getSupplierDetailsById(this.currentUser?.id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.supplierDetails = res.data;

          this.patchProfileForm(this.supplierDetails.profile);
          this.patchCertiFicateForm(this.supplierDetails.certificates);
          this.patchFactoryForm(this.supplierDetails.factoryInfos);
          this.patchLogisticsForm(this.supplierDetails.logisticsInfo);
          this.patchTestReportForm(this.supplierDetails.testReports);
          this.patchFarmForm(this.supplierDetails.farms);
          this.patchProductForm(this.supplierDetails.products);
          this.patchAssessmentReportForm(this.supplierDetails.assessmentReport);
          this.patchWorkingDocForm(this.supplierDetails.workingDocs);
          this.patchAttachmentForm(this.supplierDetails.attachments);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err: any) => {
        this.toastr.error(err || 'Something went wrong!');
      }
    })
  }

  // set get by id data 
  patchProfileForm(formValues: any) {
    this.profileFormGroup.patchValue({
      addressLine1: formValues?.addressLine1 || '',
      supplierNo: formValues?.supplierNo || '',
      supplierName: formValues?.supplierName || '',
      mainProducts: formValues?.mainProducts || '',
      companyCategory: formValues?.companyCategory || '',
      enterpriseClassification: formValues?.enterpriseClassification || '',
      productsCategory: formValues?.productsCategory || '',
      addressLine2: formValues?.addressLine2 || '',
      traceable: formValues?.traceable || false,
      export: formValues?.export || false,
      iso9001: formValues?.iso9001 || false,
      globalGap: formValues?.globalGap || false,
    });
  }
  patchCertiFicateForm(formValues: any) {
    this.certificatesData = [...formValues];
  }
  patchFactoryForm(formValues: any) {
    this.factoryData = [...formValues];
  }
  patchLogisticsForm(formValues: any) {
    this.logisticsFormGroup.patchValue({
      id: formValues?.id || '',
      name: formValues?.name || '',
      tool: formValues?.tool || '',
      logisticsRoutine: formValues?.logisticsRoutine || '',
      temperature: formValues?.temperature || '',
    });
  }
  patchTestReportForm(formValues: any) {
    this.testReportData = [...formValues];
  }
  patchFarmForm(formValues: any) {
    this.farmData = [...formValues];
  }
  patchProductForm(formValues: any) {
    this.productData = [...formValues];
  }
  patchAssessmentReportForm(formValues: any) {
    this.assessReportFormGroup.patchValue({
      id: formValues?.id || '',
      assessmentType: formValues?.assessmentType || '',
      name: formValues?.name || '',
      standard: formValues?.standard || '',
      objective: formValues?.objective || '',
      startDate: formValues?.startDate || '',
      score: formValues?.score || 0,
      option: formValues?.option || '',
    });
  }
  patchWorkingDocForm(formValues: any) {
    this.workingDocData = [...formValues];
  }
  patchAttachmentForm(formValues: any) {
    this.attachementData = [...formValues];
  }




  getCategory() {
    this.productService.getAllCategory().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.categoryList = res.data;
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err: any) => {
        this.toastr.error(err || 'Something went wrong!');
      }
    })
  }

  getName(catId: string) {
    const data = this.categoryList.find((item) => item.id == catId)
    if (data) {
      return data.name
    }
  }

  loadAllForms() {
    this.profileLoadForm();
    this.certificatesLoadForm();
    this.factoryLoadForm();
    this.logisticsLoadForm();
    this.testReportLoadForm();
    this.farmLoadForm();
    this.productLoadForm();
    this.assessReportLoadForm();
  }


  // profile form
  profileLoadForm() {
    // profile class initialized
    this.profileClass = new ProfileClass();
    this.profileClass.clear();

    this.profileFormGroup = this.fb.group({
      id: [this.profileClass.id],
      supplierNo: [this.profileClass.supplierNo, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      supplierName: [this.profileClass.supplierName, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      mainProducts: [this.profileClass.mainProducts, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      companyCategory: [this.profileClass.companyCategory, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      enterpriseClassification: [this.profileClass.enterpriseClassification, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      productsCategory: [this.profileClass.productsCategory, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      addressLine1: [this.profileClass.addressLine1, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      addressLine2: [this.profileClass.addressLine2, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      traceable: [this.profileClass.traceable, Validators.compose([Validators.required,])],
      export: [this.profileClass.export, Validators.compose([Validators.required])],
      iso9001: [this.profileClass.iso9001, Validators.compose([Validators.required])],
      globalGap: [this.profileClass.globalGap, Validators.compose([Validators.required])],
    })
  }

  // certificates form 
  certificatesLoadForm() {
    this.certificatesClass = new CertificatesClass();
    this.certificatesClass.clear();

    this.certificatesFormGroup = this.fb.group({
      id: [this.certificatesClass.id],
      licenseType: [this.certificatesClass.licenseType, Validators.compose([Validators.required])],
      issuingAuthority: [this.certificatesClass.issuingAuthority, Validators.compose([Validators.required])],
      supplierName: [this.certificatesClass.supplierName, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      effectiveDate: [this.certificatesClass.effectiveDate, Validators.compose([Validators.required])],
      expirationDate: [this.certificatesClass.expirationDate, Validators.compose([Validators.required])],
      certificateImage: [this.certificatesClass.certificateImage,],
      // country: [this.certificatesClass.country, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
    })
  }

  // factory form 
  factoryLoadForm() {
    this.factoryClass = new FactoryClass();
    this.factoryClass.clear();

    this.factoryFormGroup = this.fb.group({
      id: [this.factoryClass.id],
      name: [this.factoryClass.name, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      contactNo: [this.factoryClass.contactNo, Validators.compose([Validators.required])],
      addressLine1: [this.factoryClass.addressLine1, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      addressLine2: [this.factoryClass.addressLine2, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      staffQuantity: [this.factoryClass.staffQuantity, Validators.compose([Validators.required])],
    })
  }
  // logistics form 
  logisticsLoadForm() {
    this.logisticsClass = new LogisticsClass();
    this.logisticsClass.clear();

    this.logisticsFormGroup = this.fb.group({
      id: [this.logisticsClass.id],
      name: [this.logisticsClass.name, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      tool: [this.logisticsClass.tool, Validators.compose([Validators.required])],
      logisticsRoutine: [this.logisticsClass.logisticsRoutine, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      temperature: [this.logisticsClass.temperature, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
    })
  }
  // test report form 
  testReportLoadForm() {
    this.testReportClass = new TestReportClass();
    this.testReportClass.clear();

    this.testReportFormGroup = this.fb.group({
      id: [this.testReportClass.id],
      name: [this.testReportClass.name, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      effectiveDate: [this.testReportClass.effectiveDate, Validators.compose([Validators.required])],
      validityPeriod: [this.testReportClass.validityPeriod, Validators.compose([Validators.required, this.noWhitespaceValidator()])]
    })

  }
  // farm form 
  farmLoadForm() {
    this.farmClass = new FarmClass();
    this.farmClass.clear();

    this.farmFormGroup = this.fb.group({
      id: [this.farmClass.id],
      name: [this.farmClass.name, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      representative: [this.farmClass.representative, Validators.compose([Validators.required])],
      category: [this.farmClass.category, Validators.compose([Validators.required,])],
      code: [this.farmClass.code, Validators.compose([Validators.required,])],
      area: [this.farmClass.area, Validators.compose([Validators.required,])],
      address: [this.farmClass.address, Validators.compose([Validators.required,])],
      unitOutput: [this.farmClass.unitOutput, Validators.compose([Validators.required,])],
      staffQty: [this.farmClass.staffQty, Validators.compose([Validators.required,])],
    })
  }
  // product form 
  productLoadForm() {
    this.productClass = new ProductClass();
    this.productClass.clear();

    this.productFormGroup = this.fb.group({
      id: [this.productClass.id],
      name: [this.productClass.name, Validators.compose([Validators.required, this.noWhitespaceValidator()])],
      description: [this.productClass.description, Validators.compose([Validators.required])],
      priceRange: [this.productClass.priceRange],
      minPrice: [this.productClass.minPrice, Validators.compose([Validators.required,])],
      maxPrice: [this.productClass.maxPrice, Validators.compose([Validators.required,])],
      qty: [this.productClass.qty, Validators.compose([Validators.required,])],
      manufactureInfo: [this.productClass.manufactureInfo, Validators.compose([Validators.required,])],
      origin: [this.productClass.origin, Validators.compose([Validators.required,])],
      logistics: [this.productClass.logistics, Validators.compose([Validators.required,])],
      packing: [this.productClass.packing, Validators.compose([Validators.required,])],
      variety: [this.productClass.variety, Validators.compose([Validators.required,])],
      categoryId: [this.productClass.categoryId, Validators.compose([Validators.required,])],
    })
  }
  // assessReport form 
  assessReportLoadForm() {
    this.assessmentReportClass = new AssessmentReportClass();
    this.assessmentReportClass.clear();

    this.assessReportFormGroup = this.fb.group({
      id: [this.assessmentReportClass.id],
      assessmentType: [this.assessmentReportClass.assessmentType, Validators.compose([Validators.required,])],
      name: [this.assessmentReportClass.name, Validators.compose([Validators.required,])],
      standard: [this.assessmentReportClass.standard, Validators.compose([Validators.required,])],
      objective: [this.assessmentReportClass.objective, Validators.compose([Validators.required,])],
      startDate: [this.assessmentReportClass.startDate, Validators.compose([Validators.required,])],
      score: [this.assessmentReportClass.score, Validators.compose([Validators.required,])],
      option: [this.assessmentReportClass.option, Validators.compose([Validators.required,])],
    })
  }

  // white space validation 
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }

  getWidth(index: number): string {
    const widths = ['160px', '135px', '130px', '130px', '145px', '100px', '120px', '190px', '150px', '150px'];
    return widths[index] || '140px';
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  skipStep() {
    this.currentStep++;
  }

  nextStep(): void {
    if (this.currentStep < 10) {
      // switch (this.currentStep) {
      //   case 1:
      //     this.isSupplierProfileValid()
      //     break;

      //   case 2:
      //     this.certificateValid()
      //     break;

      //   case 3:
      //     this.isFactoryValid()
      //     break;

      //   case 4:
      //     this.isLogisticsValid()
      //     break;

      //   case 5:
      //     this.isTestReportValid()
      //     break;

      //   case 6:
      //     this.isFarmValid()
      //     break;

      //   case 7:
      //     this.isProductValid()
      //     break;

      //   case 8:
      //     this.isAssessReportValid()
      //     break;

      //   case 9:
      //     this.isWorkginDocValid()
      //     break;

      //   case 10:
      //     // this.isProductValid()
      //     break;
      // }
      this.currentStep++;
    }
  }


  isSupplierProfileValid() {
    if (this.profileFormGroup.valid) {
      this.currentStep++;
      // console.log(this.profileFormGroup?.value)
    } else {
      this.profileFormGroup.markAllAsTouched();
    }
  }

  certificateValid() {
    if (this.certificatesData.length) {
      this.currentStep++;
      // console.log(this.certificatesFormGroup?.value)
    } else {
      this.toastr.error('Certificate info not added');
    }
  }
  isFactoryValid() {
    if (this.factoryData.length) {
      this.currentStep++;
      // console.log('profile form', this.factoryFormGroup?.value)
    } else {
      this.toastr.error('Factory info not added');
    }
  }
  isLogisticsValid() {
    if (this.logisticsFormGroup.valid) {
      this.currentStep++;
      // console.log('profile form', this.factoryFormGroup?.value)
    } else {
      this.logisticsFormGroup.markAllAsTouched();
    }
  }
  isTestReportValid() {
    if (this.testReportData.length) {
      this.currentStep++;
      // console.log('profile form', this.factoryFormGroup?.value)
    } else {
      this.toastr.error('Test Report info not added');
    }
  }
  isFarmValid() {
    if (this.farmData.length) {
      this.currentStep++;
      // console.log('profile form', this.factoryFormGroup?.value)
    } else {
      this.toastr.error('Farm info not added');
    }
  }
  isProductValid() {
    if (this.productData.length) {
      this.currentStep++;
      // console.log('profile form', this.factoryFormGroup?.value)
    } else {
      this.toastr.error('Prduct info not added');
    }
  }
  isAssessReportValid() {
    if (this.assessReportFormGroup.valid) {
      this.currentStep++;
      // console.log('profile form', this.factoryFormGroup?.value)
    } else {
      this.assessReportFormGroup.markAllAsTouched();
    }
  }
  isWorkginDocValid() {
    if (this.workingDocData.length) {
      this.currentStep++;
      // console.log('profile form', this.factoryFormGroup?.value)
    } else {
      this.toastr.error('Working Document info not added');
    }
  }




  addCertificateStep_2(): void {
    // const cerdata = this.certificatesFormGroup?.value;
    // const file = this.selectedFile;
    if(this.isEditModeCerti){
        
        this.certificatesData[this.selectedCertiIndexId].licenseType = this.certificatesFormGroup.value.licenseType,
        this.certificatesData[this.selectedCertiIndexId].issuingAuthority = this.certificatesFormGroup.value.issuingAuthority,
        this.certificatesData[this.selectedCertiIndexId].supplierName = this.certificatesFormGroup.value.supplierName,
        this.certificatesData[this.selectedCertiIndexId].effectiveDate = this.certificatesFormGroup.value.effectiveDate,
        this.certificatesData[this.selectedCertiIndexId].expirationDate = this.certificatesFormGroup.value.expirationDate
          // Reset form and file data
          this.certificatesFormGroup.reset();
          this.selectedFile = null;
          this.selectedFileBase64 = null;
          this.isEditModeCerti = false;
          this.selectedCertiIndexId = 0;
    }else{
      if (this.certificatesFormGroup.valid) {
        const certificate = {
          licenseType: this.certificatesFormGroup.value.licenseType,
          issuingAuthority: this.certificatesFormGroup.value.issuingAuthority,
          supplierName: this.certificatesFormGroup.value.supplierName,
          effectiveDate: this.certificatesFormGroup.value.effectiveDate,
          expirationDate: this.certificatesFormGroup.value.expirationDate,
          certificateImage: this.selectedFileBase64 // Store base64 data for the image
        };
  
        // Add the certificate to the array
        this.certificatesData.push(certificate);
        // Reset form and file data
        this.certificatesFormGroup.reset();
        this.selectedFile = null;
        this.selectedFileBase64 = null;
      } else {
        this.certificatesFormGroup.markAllAsTouched();
      }
    }
   console.log('neeee',this.certificatesData);
  }

  isEditModeCerti:boolean = false;
  selectedCertiIndexId:number = 0
  editCerti(index:number){
    this.certificatesFormGroup.patchValue({
      licenseType: this.certificatesData[index]?.licenseType,
      issuingAuthority: this.certificatesData[index]?.issuingAuthority,
      supplierName: this.certificatesData[index]?.supplierName,
      effectiveDate: this.certificatesData[index]?.effectiveDate,
      expirationDate: this.certificatesData[index]?.expirationDate,
    })
    this.isEditModeCerti = true;
    this.selectedCertiIndexId = index;
  }



  // factory data info
  addFactoryInfo(): void {
    if (this.factoryFormGroup.valid) {
      const factoryData = {
        ...this.factoryFormGroup.value
      };
      this.factoryData.push(factoryData);
      this.factoryFormGroup.reset();
    } else {
      this.factoryFormGroup.markAllAsTouched();
    }
  }
  deleteFactory(index: number) {
    this.factoryData.splice(index, 1);
    const da = this.factoryData
  }

  addTestReport() {
    if (this.testReportFormGroup.valid && this.testReportSelectedFile) {
      const testReport = {
        ...this.testReportFormGroup.value,
        uploadFile: this.testReportSelectedFileBase64 // Store base64 data for the image
      };

      // Add the certificate to the array
      this.testReportData.push(testReport);
      debugger
      // Reset form and file data
      this.testReportFormGroup.reset();
      this.testReportSelectedFile = null;
      this.testReportSelectedFileBase64 = null;
    }
  }

  addFarm() {
    if (this.farmFormGroup.valid && this.farmSelectedFile) {
      const farm = {
        ...this.farmFormGroup.value,
        testReport: this.farmSelectedFileBase64 // Store base64 data for the image
      };

      // Add the certificate to the array
      this.farmData.push(farm);
      // Reset form and file data
      this.farmFormGroup.reset();
      this.farmSelectedFile = null;
      this.farmSelectedFileBase64 = null;
    }
  }

  addProduct() {
    const data = this.productFormGroup.value;
    debugger
    if (this.productFormGroup.valid && this.productTestReportSelectedFile && this.productCertiSelectedFile && this.productImgSelectedFile) {
      const product = {
        ...this.productFormGroup.value,
        // testReport: this.productte // Store base64 data for the image
        // certificate: this.farmSelectedFileBase64 // Store base64 data for the image
        productImage: this.productImgSelectedFileBase64 // Store base64 data for the image
      };

      // Add the certificate to the array
      this.productData.push(product);
      // Reset form and file data
      this.productFormGroup.reset();
      this.productTestReportSelectedFile = null;
      this.productCertiSelectedFile = null;
      this.productImgSelectedFileBase64 = null;
    } else {
      this.toastr.error('Product Test Report, Certificate and Image not added');
    }
  }

  checkFileType(fileData: string): boolean {
    const mimeType = fileData.split(',')[0].split(':')[1]?.split(';')[0];
    return mimeType === 'application/pdf';
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  sellerProfileUpdate() {
    const req = {
      id: this.supplierDetails?.id,
      country: this.supplierDetails?.country,
      email: this.supplierDetails?.email,
      userId: this.currentUser?.id,
      profile: this.profileFormGroup.value,
      certificates: this.certificatesData,
      factoryInfos: this.factoryData,
      logisticsInfo: this.logisticsFormGroup.value,
      testReports: this.testReportData,
      farms: this.farmData,
      products: this.productData,
      assessmentReport: this.assessReportFormGroup.value,
      workingDocs: this.workingDocData,
      attachments: this.attachementData,
    };

    this.supplierService.saveSupplierProfile(req).subscribe({
      next: (res: any) => {
        if (res.success) {
          // this.profileSavedSuccessModal();
          // this.toastr.success(res.message);
          this.successModal()
          this.getDetailsById();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err: any) => {
        this.toastr.error(err || 'Something went wrong !');
      }
    })
  }

  successModal() {
    const modalRef = this.modalService.open(DealSuccessModalComponent, { centered: true })
    modalRef.componentInstance.data = {
      heading:'Great !',
      para1 :'Your Profile Modifications has been',
      para2 :'Updated successfully'
    }
    // <h4>{{this.data ? this.data!.heading :'Congratulations !'}}</h4>
    // <p class="mt-3">{{this.data ? this.data!.para1 :'You have your deal is successfully'}}</p>
    // <p>{{this.data ? this.data!.para2 :'processed'}} </p>
    modalRef.result.then(() => { }, () => { })
  }

  // profileSavedSuccessModal(){
  //   const modalRef = this.modalService.open(SellerProfileSubmitComponent, { size: 'lg', centered: true });
  //   // modalRef.componentInstance.id = id;
  //   modalRef.result.then(() => { }, () => { });
  // }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile); // Convert file to base64
      reader.onload = () => {
        this.selectedFileBase64 = reader.result as string;
      };
    }
  }
  onTestReportFileSelect(event: any): void {
    this.testReportSelectedFile = event.target.files[0];
    debugger
    if (this.testReportSelectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.testReportSelectedFile); // Convert file to base64
      reader.onload = () => {
        this.testReportSelectedFileBase64 = reader.result as string;
      };
    }
  }
  onFarmFileSelect(event: any): void {
    this.farmSelectedFile = event.target.files[0];
    debugger
    if (this.farmSelectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.farmSelectedFile); // Convert file to base64
      reader.onload = () => {
        this.farmSelectedFileBase64 = reader.result as string;
      };
    }
  }
  // product form test report file
  onProductTestReportFileSelected(event: any): void {
    this.productTestReportSelectedFile = event.target.files[0];
    if (this.productTestReportSelectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.productTestReportSelectedFile); // Convert file to base64
      // reader.onload = () => {
      //   this.selectedFileBase64 = reader.result as string;
      // };
    }
  }
  // product certificate report file
  onProductCertiFileSelected(event: any): void {
    this.productCertiSelectedFile = event.target.files[0];
    if (this.productCertiSelectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.productCertiSelectedFile); // Convert file to base64
      // reader.onload = () => {
      //   this.selectedFileBase64 = reader.result as string;
      // };
    }
  }
  // product image report file
  onProductImgFileSelected(event: any): void {
    this.productImgSelectedFile = event.target.files[0];
    if (this.productImgSelectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.productImgSelectedFile); // Convert file to base64
      reader.onload = () => {
        this.productImgSelectedFileBase64 = reader.result as string;
      };
    }
  }
  // product working document
  onWorkingDocumentFileSelected(event: any): void {
    this.workingDocSelectedFile = event.target.files[0];
    if (this.workingDocSelectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.workingDocSelectedFile); // Convert file to base64
      reader.onload = () => {
        this.workingDocSelectedFileBase64 = reader.result as string;
      };
    }
  }

  addWorkingDoc() {
    let obj = {
      docURL: this.workingDocSelectedFileBase64,
      docDetails: this.workingDocSelectedFile
    }
    this.workingDocData.push(obj);
    console.log('doc', this.workingDocData);
    this.workingDocSelectedFile = null;
    this.workingDocSelectedFileBase64 = null;
  }

  // attachment document
  onAttachmentFileSelected(event: any): void {
    this.attachmentSelectedFile = event.target.files[0];
    if (this.attachmentSelectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.attachmentSelectedFile); // Convert file to base64
      reader.onload = () => {
        this.attachmentSelectedFileBase64 = reader.result as string;
      };
    }
  }

  addAttachment() {
    let obj = {
      docURL: this.attachmentSelectedFileBase64,
      docDetails: this.attachmentSelectedFile
    }
    this.attachementData.push(obj);
    this.attachmentSelectedFile = null;
    this.attachmentSelectedFileBase64 = null;
  }
  getFileSize(size: number) {
    const fileSizeInMB = (size / (1024 * 1024)).toFixed(2);
    return fileSizeInMB;
  }

 


  deleteCerti(index: number) {
    this.certificatesData.splice(index, 1);
  }
  deleteTestReportFile(index: number) {
    this.testReportData.splice(index, 1);
  }
  deleteFarmFile(index: number) {
    this.farmData.splice(index, 1);
  }
  deleteProduct(index: number) {
    this.productData.splice(index, 1);
  }
  deleteWorkinngDoc(index: number) {
    this.workingDocData.splice(index, 1);
  }
  deleteAttachment(index: number) {
    this.attachementData.splice(index, 1);
  }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //   } else {
  //     this.selectedFile = null;
  //   }
  // }

  clearFile(): void {
    this.selectedFile = null;
  }



  //  validations for form inputs
  isControlValid(controlName: string, dynamicFormGroup: any): boolean {
    const control = dynamicFormGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string, dynamicFormGroup: any): boolean {
    const control = dynamicFormGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string, dynamicFormGroup: any): boolean {
    const control = dynamicFormGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }


  isControlTouched(controlName: string, dynamicFormGroup: any): boolean {
    const control = dynamicFormGroup.controls[controlName];
    return control.dirty || control.touched;
  }

}

