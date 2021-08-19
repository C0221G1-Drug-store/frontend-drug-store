import { TestBed } from '@angular/core/testing';

import { ExportBillServiceService } from './export-bill-service.service';

describe('ExportBillServiceService', () => {
  let service: ExportBillServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportBillServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
