import { TestBed } from '@angular/core/testing';

import { RepairsCarResolver } from './repairs-car.resolver';

describe('RepairsCarResolver', () => {
  let resolver: RepairsCarResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepairsCarResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
