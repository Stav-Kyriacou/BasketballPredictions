import { TestBed } from '@angular/core/testing';

import { SaveCheckGuard } from './save-check.guard';

describe('SaveCheckGuard', () => {
  let guard: SaveCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaveCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
