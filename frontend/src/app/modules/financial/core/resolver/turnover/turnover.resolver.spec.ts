import { TestBed } from '@angular/core/testing';

import { TurnoverResolver } from './turnover.resolver';

describe('TurnoverResolver', () => {
  let resolver: TurnoverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TurnoverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
