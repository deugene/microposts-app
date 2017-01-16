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
  feed: Micropost[];
  @Input() currentId: string;
  @Input() isCurrUser: boolean;

  // pagination
  currentPage: number;
  totalItems: number;
  itemsLimit = 10;
  offset = 0;

  constructor(
    public userService: UserService,
    public micropostService: MicropostService
  ) { }

  ngOnInit() {
    this.getFeed();
  }

  private getFeed(): void {
    const paginationOpts = {
      offset: this.offset,
      limit: this.itemsLimit
    };
    this.userService
      .feed(this.currentId, paginationOpts)
      .then(result => {
        this.feed = result.data;
        this.totalItems = result.count;
      });
  }

  pageChanged(newPage: number): void {
    this.offset = (newPage - 1) * this.itemsLimit;
    this.currentPage = newPage;
    this.getFeed();
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

  addMicropost(body: string): void {
    const newMicropost = new Micropost(body, this.currentId);
    this.micropostService
      .create(newMicropost)
      .then(() => this.getFeed());
  }
}
