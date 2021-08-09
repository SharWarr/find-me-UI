import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { RoomTaskService } from '../room-task.service';
import { Room } from './room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() room!: Room;
  
  constructor(private roomTaskService : RoomTaskService) {  }


  ngOnInit(): void {
  }
  
}