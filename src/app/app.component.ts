import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  user_id: string;

  constructor(
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.getUserProfile()
      .then(profile => {
        if (!profile) {
          this.user_id = null;
        } else {
          this.user_id = profile.identities[0].user_id;
        }
      });
  }

  homeUrl(): string {
    if (this.auth.authenticated) { return `/users/${this.user_id}/overview`; };
    return '/home';
  }
}
