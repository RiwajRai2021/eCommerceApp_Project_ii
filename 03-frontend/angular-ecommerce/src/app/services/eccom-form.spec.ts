import { TestBed } from '@angular/core/testing';

import { EccomForm } from './eccom-form';

describe('EccomForm', () => {
  let service: EccomForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EccomForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
