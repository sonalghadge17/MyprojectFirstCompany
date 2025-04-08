import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbActiveModal, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VeiwContactComponent } from './contact-us/veiw-contact/veiw-contact.component';


@NgModule({
  declarations: [
    SettingComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    VeiwContactComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,ReactiveFormsModule,CKEditorModule,
    NgxPaginationModule,
    NgbDatepickerModule
  ],
  providers:[NgbActiveModal]
})
export class SettingModule { }
