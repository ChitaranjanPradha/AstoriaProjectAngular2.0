import { TestBed } from '@angular/core/testing';

import { AllowancesService } from './allowances.service';

describe('AllowancesService', () => {
  let service: AllowancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
