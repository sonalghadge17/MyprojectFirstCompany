import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourseComponent } from './resourse.component';

describe('ResourseComponent', () => {
  let component: ResourseComponent;
  let fixture: ComponentFixture<ResourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
