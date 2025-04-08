import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourseRoutingModule } from './resourse-routing.module';
import { ResourseComponent } from '../resourse/resourse.component';
import { BlogComponent } from './blog/blog.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { WhitepaperComponent } from './whitepaper/whitepaper.component';
import { AddWhitepaperComponent } from './whitepaper/add-whitepaper/add-whitepaper.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AddFaqsComponent } from './faqs/add-faqs/add-faqs.component';


@NgModule({
  declarations: [
    ResourseComponent,
    BlogComponent,
    AddBlogComponent,
    WhitepaperComponent,
    AddWhitepaperComponent,
    NewsComponent,
    AddNewsComponent,
    FaqsComponent,
    AddFaqsComponent
  ],
  imports: [
    CommonModule,
    ResourseRoutingModule,
      FormsModule,ReactiveFormsModule,NgxPaginationModule,NgbDatepickerModule, CKEditorModule,
        ImageCropperModule,  NgxDocViewerModule,NgxDropzoneModule,
  ]
})
export class ResourseModule { }
