import { TestBed } from '@angular/core/testing';

import { TimeAverageResolver } from './time-average.resolver';

describe('TimeAverageResolver', () => {
  let resolver: TimeAverageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TimeAverageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
