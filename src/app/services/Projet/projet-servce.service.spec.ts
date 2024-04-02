import { TestBed } from '@angular/core/testing';

import { ProjetServceService } from './projet-servce.service';

describe('ProjetServceService', () => {
  let service: ProjetServceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetServceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
