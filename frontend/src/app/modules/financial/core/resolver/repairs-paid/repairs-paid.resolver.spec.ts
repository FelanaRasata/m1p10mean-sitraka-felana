import { TestBed } from '@angular/core/testing';

import { RepairsPaidResolver } from './repairs-paid.resolver';

describe('RepairsPaidResolver', () => {
  let resolver: RepairsPaidResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepairsPaidResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
