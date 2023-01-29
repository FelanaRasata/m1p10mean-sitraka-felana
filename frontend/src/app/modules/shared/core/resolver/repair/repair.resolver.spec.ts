import { TestBed } from '@angular/core/testing';

import { RepairResolver } from './repair.resolver';

describe('RepairResolver', () => {
  let resolver: RepairResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepairResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
