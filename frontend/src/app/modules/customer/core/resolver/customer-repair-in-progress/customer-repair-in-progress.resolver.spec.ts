import { TestBed } from '@angular/core/testing';

import { CustomerRepairInProgressResolver } from './customer-repair-in-progress.resolver';

describe('CustomerRepairInProgressResolver', () => {
  let resolver: CustomerRepairInProgressResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CustomerRepairInProgressResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
