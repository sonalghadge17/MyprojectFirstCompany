import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelConfirmModalComponent } from './cancel-confirm-modal.component';

describe('CancelConfirmModalComponent', () => {
  let component: CancelConfirmModalComponent;
  let fixture: ComponentFixture<CancelConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelConfirmModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
