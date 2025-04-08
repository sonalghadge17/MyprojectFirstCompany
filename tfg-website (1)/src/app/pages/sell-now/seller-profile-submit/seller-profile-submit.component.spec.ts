import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProfileSubmitComponent } from './seller-profile-submit.component';

describe('SellerProfileSubmitComponent', () => {
  let component: SellerProfileSubmitComponent;
  let fixture: ComponentFixture<SellerProfileSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerProfileSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerProfileSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
