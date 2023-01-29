import { TestBed } from '@angular/core/testing';

import { DiagnosisResolver } from './diagnosis.resolver';

describe('DiagnosisResolver', () => {
  let resolver: DiagnosisResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DiagnosisResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
