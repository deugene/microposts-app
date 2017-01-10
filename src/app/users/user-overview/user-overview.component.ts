import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../user';

import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';
import { RelationshipService } from '../../relationship.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  user: User;
  currentUser: User;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService,
    private relationshipService: RelationshipService
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.findById(params['userId']))
      .subscribe(user => {
        this.user = user;
        if (this.user.microposts) {
          this.user.microposts.sort((a, b) =>
            Date.parse(b.createdAt) - Date.parse(a.createdAt)
          );
        }
      });
    this.auth.getUserProfile()
      .then(profile => {
        const currentUserId = profile.identities[0].user_id;
        this.userService
          .findById(currentUserId)
          .then(currentUser => this.currentUser = currentUser);
      });
  }

  goBack(): void {
    this.location.back();
  }

  isCurrent(): boolean {
    return this.user.id === this.currentUser.id;
  }

  isFollow(): boolean {
    console.log(this.currentUser);
    console.log('----');
    console.log(this.user);
    return this.relationshipService.isFollow(this.currentUser, this.user.id);
  }

  follow(): void {
    this.relationshipService.follow(this.currentUser.id, this.user.id);
  }

  unfollow(): void {
    this.relationshipService.unfollow(this.currentUser.id, this.user.id);
  }

  test(): string {
    return JSON.stringify(this.user);
  }
}
