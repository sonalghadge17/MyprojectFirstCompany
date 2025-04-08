import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from '../account/account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CKEditorModule, } from '@ckeditor/ckeditor5-angular';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AccountComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
     FormsModule,ReactiveFormsModule,
        NgxDropzoneModule,
        CKEditorModule,
        NgbNavModule,
        NgSelectModule,
        NgxPaginationModule
  ]
})
export class AccountModule { }
