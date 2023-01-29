import { TestBed } from '@angular/core/testing';

import { RepairListResolver } from './repair-list.resolver';

describe('RepairListResolver', () => {
  let resolver: RepairListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepairListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
