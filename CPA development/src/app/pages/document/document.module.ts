import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddDocumentComponent } from './add-document/add-document.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    DocumentComponent,
    AddDocumentComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgxDropzoneModule,
    CKEditorModule,
    NgbNavModule,
    NgSelectModule,
    NgxPaginationModule,
    NgbDatepickerModule
  ]
})
export class DocumentModule { }
