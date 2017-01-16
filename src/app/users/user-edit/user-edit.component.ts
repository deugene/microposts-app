import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  isSocial: boolean;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.findById(params['userId']))
      .subscribe(user => {
        this.isSocial = !user.id.startsWith('auth0');
        this.user = user;
      });
  }

  goBack(): void {
    this.location.back();
  }

  changePass(): void {
    this.userService
      .changePass(this.user.id)
      .then(ticket => window.open(ticket));
  }

  onSubmit(): void {
    const auth0Update: any = {};
    auth0Update.id = this.user.id;
    if (!this.isSocial) { auth0Update.email = this.user.email; }
    auth0Update.user_metadata = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      name: this.user.firstName + ' ' + this.user.lastName,
      admin: this.user.admin
    };
    this.userService
      .auth0Update(this.user.id, auth0Update)
      .then(success => {
        if (success) {
          this.userService.update(this.user.id, this.user);
          this.router.navigate([ `overview/${this.user.id}` ])
        }
      });
  }

}
