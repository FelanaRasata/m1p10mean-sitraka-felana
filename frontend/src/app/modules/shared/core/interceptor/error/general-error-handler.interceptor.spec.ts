import { TestBed } from '@angular/core/testing';

import { GeneralErrorHandlerInterceptor } from './general-error-handler.interceptor';

describe('GeneraErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GeneralErrorHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GeneralErrorHandlerInterceptor = TestBed.inject(GeneralErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
