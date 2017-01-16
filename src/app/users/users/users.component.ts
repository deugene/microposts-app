import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'Users list';
  users: User[];

  // pagination
  currentPage: number;
  totalItems: number;
  itemsLimit = 10;
  previousId = '';


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    const paginationOpts = {
      previousId: this.previousId,
      limit: this.itemsLimit
    };
    this.userService.all(paginationOpts).then(result => {
      this.users = result.data;
      this.previousId = result.previousId;
      this.totalItems = result.count;
    });
  }

}
