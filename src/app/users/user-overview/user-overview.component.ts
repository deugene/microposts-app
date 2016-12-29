import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../user';
import { UserDataService } from '../../user-data.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  user: User;

  constructor(
    private userData: UserDataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userData.findById(+params['userId']))
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

}
