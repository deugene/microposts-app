import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(
    private userDataService: UserDataService,
  ) { }

  ngOnInit() {
    this.userDataService.findAll().then(users => this.users = users);
  }

}
