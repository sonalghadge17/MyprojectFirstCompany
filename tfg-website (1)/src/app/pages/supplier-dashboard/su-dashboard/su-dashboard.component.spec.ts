import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuDashboardComponent } from './su-dashboard.component';

describe('SuDashboardComponent', () => {
  let component: SuDashboardComponent;
  let fixture: ComponentFixture<SuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
