import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEmptyComponent } from './custom-empty.component';

describe('CustomEmptyComponent', () => {
  let component: CustomEmptyComponent;
  let fixture: ComponentFixture<CustomEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
