import { TestBed } from '@angular/core/testing';

import { MembreProjetServiceService } from './membre-projet-service.service';

describe('MembreProjetServiceService', () => {
  let service: MembreProjetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreProjetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
