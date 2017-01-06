import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../user';

import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  user: User;
  currentUserId: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService
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
      .then(profile => this.currentUserId = profile.identities[0].user_id);
  }

  goBack(): void {
    this.location.back();
  }

  isCurrent(): boolean {
    return this.user.id === this.currentUserId;
  }
}
