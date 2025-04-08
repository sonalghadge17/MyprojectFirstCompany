import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGetModalComponent } from './password-get-modal.component';

describe('PasswordGetModalComponent', () => {
  let component: PasswordGetModalComponent;
  let fixture: ComponentFixture<PasswordGetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordGetModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordGetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
