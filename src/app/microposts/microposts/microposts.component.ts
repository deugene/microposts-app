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

  showDialog = { visible: false, type: '' };
  selectedMicropost: Micropost;

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

  edit(body: string): void {
    this.micropostService
      .update(this.selectedMicropost.id, { body: body })
      .then(() => {
        this.selectedMicropost = undefined;
        this.getFeed();
      });
  }

  delete(): void {
    this.micropostService
      .destroy(this.selectedMicropost.id)
      .then(() => {
        this.selectedMicropost = undefined;
        this.getFeed();
      });
  }

  addMicropost(body: string): void {
    const newMicropost = new Micropost(body, this.currentId);
    this.micropostService
      .create(newMicropost)
      .then(() => this.getFeed());
  }

  // show dialogs
  showModal(micropost: Micropost, type: string): void {
    this.selectedMicropost = micropost;
    this.showDialog.visible = !this.showDialog.visible;
    this.showDialog.type = type;
  }
}
