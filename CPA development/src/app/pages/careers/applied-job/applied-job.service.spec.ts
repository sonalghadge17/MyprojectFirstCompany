import { TestBed } from '@angular/core/testing';

import { AppliedJobService } from './applied-job.service';

describe('AppliedJobService', () => {
  let service: AppliedJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppliedJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
