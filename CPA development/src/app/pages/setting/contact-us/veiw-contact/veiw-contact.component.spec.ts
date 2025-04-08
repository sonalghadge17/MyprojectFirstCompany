import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwContactComponent } from './veiw-contact.component';

describe('VeiwContactComponent', () => {
  let component: VeiwContactComponent;
  let fixture: ComponentFixture<VeiwContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiwContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeiwContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
