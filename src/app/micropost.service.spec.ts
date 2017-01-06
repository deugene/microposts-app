/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MicropostService } from './micropost.service';

describe('MicropostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicropostService]
    });
  });

  it('should ...', inject([MicropostService], (service: MicropostService) => {
    expect(service).toBeTruthy();
  }));
});
