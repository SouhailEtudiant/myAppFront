import { TestBed } from '@angular/core/testing';

import { ParamPrioriteServiceService } from './param-priorite-service.service';

describe('ParamPrioriteServiceService', () => {
  let service: ParamPrioriteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamPrioriteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
