import { TestBed } from '@angular/core/testing';

import { CarListResolver } from './car-list.resolver';

describe('CarListResolver', () => {
  let resolver: CarListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CarListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
