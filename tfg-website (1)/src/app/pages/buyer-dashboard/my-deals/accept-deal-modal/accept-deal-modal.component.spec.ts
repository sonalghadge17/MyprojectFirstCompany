import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDealModalComponent } from './accept-deal-modal.component';

describe('AcceptDealModalComponent', () => {
  let component: AcceptDealModalComponent;
  let fixture: ComponentFixture<AcceptDealModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptDealModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptDealModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
