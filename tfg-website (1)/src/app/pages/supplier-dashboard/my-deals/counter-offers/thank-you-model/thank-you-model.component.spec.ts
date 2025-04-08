import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouModelComponent } from './thank-you-model.component';

describe('ThankYouModelComponent', () => {
  let component: ThankYouModelComponent;
  let fixture: ComponentFixture<ThankYouModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankYouModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThankYouModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
