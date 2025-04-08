import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [{
     path:"",
      component:AboutUsComponent
    },
    {
      path:"testimonials",
      component:TestimonialsComponent
     
    },
    {
      path:"jobs",
      component:JobsComponent
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
