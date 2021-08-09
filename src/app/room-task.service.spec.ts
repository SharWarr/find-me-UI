import { TestBed } from '@angular/core/testing';

import { RoomTaskService } from './room-task.service';

describe('RoomTaskService', () => {
  let service: RoomTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
