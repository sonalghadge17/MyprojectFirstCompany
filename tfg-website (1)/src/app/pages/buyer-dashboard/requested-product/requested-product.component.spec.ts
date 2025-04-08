import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedProductComponent } from './requested-product.component';

describe('RequestedProductComponent', () => {
  let component: RequestedProductComponent;
  let fixture: ComponentFixture<RequestedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestedProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
