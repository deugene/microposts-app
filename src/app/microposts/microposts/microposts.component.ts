import { Component, OnInit, Input } from '@angular/core';
import { Micropost } from '../../micropost';

import { UserService } from '../../user.service';
import { MicropostService } from '../../micropost.service';

@Component({
  selector: 'app-microposts',
  templateUrl: './microposts.component.html',
  styleUrls: ['./microposts.component.css']
})
export class MicropostsComponent implements OnInit {
  @Input() feed: Micropost[];
  @Input() currentId: string;

  constructor(
    public userService: UserService,
    public micropostService: MicropostService
  ) { }

  ngOnInit() {
  }

  postedAt(date: string): string {
    const time = new Date(date).toTimeString().slice(0, 9);
    date = new Date(date).toDateString();
    return time + ' ' + date;
  }

  isCurrent(authorId: string): boolean {
    return authorId === this.currentId;
  }

  edit(): void {

  }

  delete(id: string): void {

  }
}
