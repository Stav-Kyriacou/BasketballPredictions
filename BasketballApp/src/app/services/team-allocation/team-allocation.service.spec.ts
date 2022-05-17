import { TestBed } from '@angular/core/testing';

import { TeamAllocationService } from './team-allocation.service';

describe('TeamAllocationService', () => {
  let service: TeamAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
