import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppliedJobComponent } from './applied-job/applied-job.component';

const routes: Routes = [
  {
    path:"appliedjob",
    component:AppliedJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule { }
