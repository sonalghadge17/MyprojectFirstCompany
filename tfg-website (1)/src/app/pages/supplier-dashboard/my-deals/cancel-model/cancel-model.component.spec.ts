import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelModelComponent } from './cancel-model.component';

describe('CancelModelComponent', () => {
  let component: CancelModelComponent;
  let fixture: ComponentFixture<CancelModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
