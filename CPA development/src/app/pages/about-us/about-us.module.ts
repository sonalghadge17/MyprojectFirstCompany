import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddTestimonialsComponent } from './testimonials/add-testimonials/add-testimonials.component';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobsComponent } from './jobs/add-jobs/add-jobs.component';
import {  NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AboutUsComponent,
    TestimonialsComponent,
    AddTestimonialsComponent,
    JobsComponent,
    AddJobsComponent,
   
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,   FormsModule,ReactiveFormsModule,NgxPaginationModule,CKEditorModule, 
   
    NgbDatepickerModule
  ]
})
export class AboutUsModule { }
