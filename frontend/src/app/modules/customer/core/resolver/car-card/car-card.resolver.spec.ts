import { TestBed } from '@angular/core/testing';

import { CarCardResolver } from './car-card.resolver';

describe('CarCardResolver', () => {
  let resolver: CarCardResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CarCardResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
