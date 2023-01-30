import { TestBed } from '@angular/core/testing';

import { BenefitResolver } from './benefit.resolver';

describe('BenefitResolver', () => {
  let resolver: BenefitResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BenefitResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
