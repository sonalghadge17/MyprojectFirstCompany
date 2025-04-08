import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbToastModule, NgbProgressbarModule,
  NgbDatepickerModule,
  NgbPopoverModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from "./dashboards/dashboards.module";
import { HomeComponent } from './home/home.component';
import { OurMissionComponent } from './our-mission/our-mission.component';
import { EnvironmentSustainabilityComponent } from './home/environment-sustainability/environment-sustainability.component';
import { SellNowComponent } from './sell-now/sell-now.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgStepperModule} from 'angular-ng-stepper';
import { CountryDetailsModalComponent } from './home/country-details-modal/country-details-modal.component';
import { SellerProfileSubmitComponent } from './sell-now/seller-profile-submit/seller-profile-submit.component';
import { CountryProductDetailsComponent } from './home/country-product-details/country-product-details.component';
import { BuyerHomeModule } from './buyer-home/buyer-home.module';
import { SupplierDashboardModule } from './supplier-dashboard/supplier-dashboard.module';
import { NumbersOnly } from '../core/custom-directive/numbers-only';


@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,
    HomeComponent,
    OurMissionComponent,
    EnvironmentSustainabilityComponent,
    SellNowComponent,
    CountryDetailsModalComponent,
    SellerProfileSubmitComponent,
    CountryProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    CountUpModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    SlickCarouselModule,
    LightboxModule,
    DashboardsModule,
    CdkStepperModule,
    NgStepperModule,
    NgSelectModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    NgbModalModule,
    BuyerHomeModule,
    SupplierDashboardModule,
    NumbersOnly
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
