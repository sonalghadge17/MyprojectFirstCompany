import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedProductSupplierComponent } from './requested-product-supplier.component';

describe('RequestedProductSupplierComponent', () => {
  let component: RequestedProductSupplierComponent;
  let fixture: ComponentFixture<RequestedProductSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestedProductSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestedProductSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
