import { TestBed } from '@angular/core/testing';

import { RepairsInitiatedResolver } from './repairs-initiated.resolver';

describe('RepairsInitiatedResolver', () => {
  let resolver: RepairsInitiatedResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepairsInitiatedResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
