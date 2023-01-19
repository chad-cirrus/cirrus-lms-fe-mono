import { TestBed } from '@angular/core/testing';

import { FullStoryService } from './full-story.service';

describe('FullStoryService', () => {
  let service: FullStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
