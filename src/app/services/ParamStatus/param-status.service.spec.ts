import { TestBed } from '@angular/core/testing';

import { ParamStatusService } from './param-status.service';

describe('ParamStatusService', () => {
  let service: ParamStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
