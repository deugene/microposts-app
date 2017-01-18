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
  offset = 0;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    const paginationOpts = {
      offset: this.offset,
      limit: this.itemsLimit
    };
    this.userService
      .all(paginationOpts)
      .then(result => {
        this.users = result.data;
        this.totalItems = result.count;
      });
  }

  pageChanged(newPage: number): void {
    this.offset = (newPage - 1) * this.itemsLimit;
    this.currentPage = newPage;
    this.getAllUsers();
  }

  delete(id: string): void {
    this.userService.destroy(id)
      .then(() => this.getAllUsers());

  }

}
