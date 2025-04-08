import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { MusicianManagementComponent } from './musician-management/musician-management.component';
import { MusicManagementComponent } from './music-management/music-management.component';
import { FinanceManagementComponent } from './finance-management/finance-management.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';

const routes: Routes = [
    {
        path: "",
        component: MusicianManagementComponent
    },
    {
      path: "music",
      component: MusicManagementComponent
  },
  {
    path: "finance",
    component: FinanceManagementComponent
},
{
  path: "contact",
  component: ContactManagementComponent
}
    // {
    //   path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    // },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
