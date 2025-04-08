import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupQuestionsModalComponent } from './signup-questions-modal.component';

describe('SignupQuestionsModalComponent', () => {
  let component: SignupQuestionsModalComponent;
  let fixture: ComponentFixture<SignupQuestionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupQuestionsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupQuestionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
