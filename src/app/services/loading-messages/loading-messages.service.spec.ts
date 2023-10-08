import { TestBed } from '@angular/core/testing';

import { LoadingMessagesService } from './loading-messages.service';

describe('LoadingMessagesService', () => {
  let service: LoadingMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
