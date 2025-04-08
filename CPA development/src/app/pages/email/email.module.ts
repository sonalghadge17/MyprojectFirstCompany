import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbCollapseModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,SimplebarAngularModule,
    FeatherModule.pick(allIcons),
    FormsModule,ReactiveFormsModule,
    CKEditorModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgPipesModule,
  ]
})
export class EmailModule { }
