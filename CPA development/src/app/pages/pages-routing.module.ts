import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { UsersComponent } from './users/users.component';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
    {
        path: "dash",
        component: DashboardComponent
    },
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
    {
      path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
    },
    {
      path: 'pages', loadChildren: () => import('./extrapages/extraspages.module').then(m => m.ExtraspagesModule)
    },
    {
      path: 'ProfileUpdate', loadChildren: () => import('./profile-update/profile-update.module').then(m => m.ProfileUpdateModule)
    },
    {
      path: 'document', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)
    },
    {
      path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
    },
    {
      path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    
    {
      path: 'resourse', loadChildren: () => import('./resourse/resourse.module').then(m => m.ResourseModule)
    },
   
    
    {
      path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
       
    {
      path: 'aboutus', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
    },
    
    {
      path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
    },
   
    
    {
      path: 'Modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
    },
    {
      path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
    },
    {
      path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
      path: 'career', loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule)
    },
    {
      path: "users",
      component: UsersComponent
  },
  {
    path: "permissions/:id",
    component: PermissionsComponent
}
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
