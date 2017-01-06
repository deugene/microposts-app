import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../user';
import { UserService } from '../../user.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.findById(params['userId']))
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  changePass(): void {

  }

  onSubmit(): void {

  }

}
