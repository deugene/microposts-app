import { Component, OnInit, Input } from '@angular/core';
import { Micropost } from '../../micropost';

@Component({
  selector: 'app-microposts',
  templateUrl: './microposts.component.html',
  styleUrls: ['./microposts.component.css']
})
export class MicropostsComponent implements OnInit {
  @Input() feed: Micropost[];

  constructor() { }

  ngOnInit() {
  }

}
