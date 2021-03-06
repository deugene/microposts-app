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

  relationshipType: string = null;
  relationshipUsers: User[] = null;

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
    this.init();
  }

  init(): void {
    this.auth.getUserProfile()
      .then(profile => this.userService.findById(profile.user_id))
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
            this.hideRelationships();
          });
      });
  }

  goBack(): void {
    this.location.back();
  }

  follow(): void {
    this.relationshipService.follow(this.currentUser.id, this.user.id)
      .then(() => this.userService.findById(this.user.id))
      .then(user => {
        this.user = user;
        this.isFollow = true;
      });
  }

  unfollow(): void {
    this.relationshipService
      .unfollow(this.currentUser.id, this.user.id)
      .then(() => this.userService.findById(this.user.id))
      .then(user => {
        this.user = user;
        this.isFollow = false;
      });
  }

  showRelationships(type: string): void {
    this.relationshipType = type;
    if (type === 'followers') {
      this.relationshipUsers = this.user.followers;
    } else {
      this.relationshipUsers = this.user.followedUsers;
    }
  }

  hideRelationships(): void {
    this.relationshipType = null;
    this.relationshipUsers = null;
  }

  delete(id: string): void {
    this.userService.destroy(id)
      .then(() => this.router.navigate([ '/users' ]));
  }

}
