import { TestBed } from '@angular/core/testing';

import { BolgService } from './bolg.service';

describe('BolgService', () => {
  let service: BolgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BolgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
