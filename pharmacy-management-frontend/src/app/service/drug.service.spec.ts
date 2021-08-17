import { TestBed } from '@angular/core/testing';

import { DrugClientService } from './drug-client.service';

describe('DrugService', () => {
  let service: DrugClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
