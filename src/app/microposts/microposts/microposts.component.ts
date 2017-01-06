import { Component, OnInit, Input } from '@angular/core';
import { Micropost } from '../../micropost';

import { MicropostService } from '../../micropost.service';

@Component({
  selector: 'app-microposts',
  templateUrl: './microposts.component.html',
  styleUrls: ['./microposts.component.css']
})
export class MicropostsComponent implements OnInit {
  @Input() microposts: Micropost[];
  @Input() user_id: string;
  @Input() current: boolean;

  constructor(private micropostService: MicropostService) { }

  ngOnInit() {
  }

  addMicropost(body: string): void {
    const newMicropost = new Micropost(body, this.user_id);
    this.micropostService
      .create(newMicropost)
      .then(m => {
        this.microposts.push(m);
        this.microposts.sort((a, b) =>
          Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
      });
  }

}
