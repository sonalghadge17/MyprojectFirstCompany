import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentSustainabilityComponent } from './environment-sustainability.component';

describe('EnvironmentSustainabilityComponent', () => {
  let component: EnvironmentSustainabilityComponent;
  let fixture: ComponentFixture<EnvironmentSustainabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentSustainabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvironmentSustainabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
