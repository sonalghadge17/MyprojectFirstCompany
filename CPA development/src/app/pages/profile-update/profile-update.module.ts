import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUpdateRoutingModule } from './profile-update-routing.module';
import { ProfileUpdateComponent } from './profile-update.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProfileUpdateComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileUpdateRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgbNavModule,
  ]
})
export class ProfileUpdateModule { }
