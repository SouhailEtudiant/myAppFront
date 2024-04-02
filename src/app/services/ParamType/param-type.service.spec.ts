import { TestBed } from '@angular/core/testing';

import { ParamTypeService } from './param-type.service';

describe('ParamTypeService', () => {
  let service: ParamTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
