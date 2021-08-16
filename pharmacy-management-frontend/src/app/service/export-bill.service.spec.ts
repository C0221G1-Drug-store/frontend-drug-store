import { TestBed } from '@angular/core/testing';

import { ExportBillService } from './export-bill.service';

describe('ExportBillService', () => {
  let service: ExportBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
