import { TestBed } from '@angular/core/testing';

import { patientService } from './patientservice.service';

describe('PatientserviceService', () => {
  let service: patientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(patientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
