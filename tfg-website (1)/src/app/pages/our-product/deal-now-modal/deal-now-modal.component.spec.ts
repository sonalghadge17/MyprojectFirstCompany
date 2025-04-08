import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealNowModalComponent } from './deal-now-modal.component';

describe('DealNowModalComponent', () => {
  let component: DealNowModalComponent;
  let fixture: ComponentFixture<DealNowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealNowModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealNowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
