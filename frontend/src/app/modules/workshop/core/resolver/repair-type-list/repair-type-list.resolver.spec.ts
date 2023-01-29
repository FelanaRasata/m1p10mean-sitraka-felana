import { TestBed } from '@angular/core/testing';

import { RepairTypeListResolver } from './repair-type-list.resolver';

describe('RepairTypeListResolver', () => {
  let resolver: RepairTypeListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepairTypeListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
