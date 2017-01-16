import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  @Input() title: string;
  @Input() users: User[];

  // pagination
  currentPage = 1;
  itemsLimit = 10;
  offset = 0;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

}
