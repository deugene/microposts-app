import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../user';
import { Micropost } from '../../micropost';

import { UserService } from '../../user.service';
import { MicropostService } from '../../micropost.service';
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

  feed: Micropost[];

  isFollow: boolean;
  isCurrent: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private auth: AuthService,
    private userService: UserService,
    private relationshipService: RelationshipService,
    private micropostService: MicropostService
  ) { }

  ngOnInit(): void {
    this.auth.getUserProfile()
      .then(profile => {
        const currentUserId = profile.user_id;
        this.userService
          .findById(currentUserId)
          .then(currentUser => {
            this.route.params
              .switchMap((params: Params): Promise<User> => {
                return this.userService.findById(params['userId']);
              })
              .subscribe(user => {
                this.user = user;
                this.currentUser = currentUser;
                this.isFollow = this.relationshipService.isFollow(
                  this.currentUser,
                  this.user.id
                );
                this.isCurrent = this.user.id === this.currentUser.id;
                this.userService
                  .feed(this.user.id)
                  .then(feed => this.feed = feed);
              });
          });
      });
  }

  goBack(): void {
    this.location.back();
  }

  follow(): void {
    this.relationshipService
      .follow(this.currentUser.id, this.user.id)
      .then(() => {
        this.userService
          .findById(this.user.id)
          .then(user => {
            this.user = user;
            this.isFollow = true;
          });
      });
  }

  unfollow(): void {
    this.relationshipService
      .unfollow(this.currentUser.id, this.user.id)
      .then(() => {
        this.userService
          .findById(this.user.id)
          .then(user => {
            this.user = user;
            this.isFollow = false;
          });
      });
  }

  addMicropost(body: string): void {
    const newMicropost = new Micropost(body, this.user.id);
    this.micropostService
      .create(newMicropost)
      .then(() => {
        this.userService
          .feed(this.user.id)
          .then(feed => this.feed = feed);
      });
  }
}
