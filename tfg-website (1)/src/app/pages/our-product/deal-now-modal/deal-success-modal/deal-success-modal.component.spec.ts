import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSuccessModalComponent } from './deal-success-modal.component';

describe('DealSuccessModalComponent', () => {
  let component: DealSuccessModalComponent;
  let fixture: ComponentFixture<DealSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealSuccessModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
