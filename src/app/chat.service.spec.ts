import { TestBed } from '@angular/core/testing';

import { chatService } from './chat.service';

describe('ChatService', () => {
  let service: chatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(chatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
