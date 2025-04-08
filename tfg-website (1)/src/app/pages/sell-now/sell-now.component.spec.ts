import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellNowComponent } from './sell-now.component';

describe('SellNowComponent', () => {
  let component: SellNowComponent;
  let fixture: ComponentFixture<SellNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellNowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
