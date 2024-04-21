import { TestBed } from '@angular/core/testing';

import { TacheServicesService } from './tache-services.service';

describe('TacheServicesService', () => {
  let service: TacheServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacheServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
