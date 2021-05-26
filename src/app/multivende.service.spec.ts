import { TestBed } from '@angular/core/testing';

import { MultivendeService } from './multivende.service';

describe('MultivendeService', () => {
  let service: MultivendeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultivendeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
