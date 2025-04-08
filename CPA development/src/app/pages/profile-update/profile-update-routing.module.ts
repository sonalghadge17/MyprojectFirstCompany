import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileUpdateComponent } from './profile-update.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path:"",
  component:ProfileUpdateComponent,
  children: [
    { path: "profile", component: ProfileComponent },
    { path: "changepassword", component: ChangePasswordComponent },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileUpdateRoutingModule { }
