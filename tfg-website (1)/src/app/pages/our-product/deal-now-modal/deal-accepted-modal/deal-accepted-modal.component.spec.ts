import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealAcceptedModalComponent } from './deal-accepted-modal.component';

describe('DealAcceptedModalComponent', () => {
  let component: DealAcceptedModalComponent;
  let fixture: ComponentFixture<DealAcceptedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealAcceptedModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealAcceptedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
