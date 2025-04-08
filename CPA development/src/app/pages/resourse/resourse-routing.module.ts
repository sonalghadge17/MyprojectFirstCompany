import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourseComponent } from './resourse.component';
import { BlogComponent } from './blog/blog.component';
import { WhitepaperComponent } from './whitepaper/whitepaper.component';
import { NewsComponent } from './news/news.component';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [{
    path:"",
    component:ResourseComponent
  },
  {
    path:"blog",
    component:BlogComponent
  },
  {
    path:"whitepaper",
    component:WhitepaperComponent
  },
  {
    path:"news",
    component:NewsComponent
  },
  
  {
    path:"faqs",
    component:FaqsComponent
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourseRoutingModule { }
