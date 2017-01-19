import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
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
export class UserEditComponent implements OnInit, AfterViewChecked {
  title = 'User Edit page';
  user: User;
  isSocial: boolean;

  submitDisabled = true;

  userEditForm: NgForm;
  @ViewChild('userEditForm') currentForm: NgForm;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First Name is required.',
      'pattern': 'First Name must contain at least 3 and less than 31 characters',
    },
    'lastName': {
      'required': 'Last Name is required.',
      'pattern': 'Last Name must contain less than 31 characters'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Wrong email format'
    }
  };

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params): Promise<User> => {
        return this.userService.findById(params['userId']);
      })
      .subscribe(user => {
        this.isSocial = !user.id.startsWith('auth0');
        this.user = user;
      });
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged(): void {
    if (this.currentForm === this.userEditForm) { return; }
    this.userEditForm = this.currentForm;
    if (this.userEditForm) {
      this.userEditForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any): void {
    if (!this.userEditForm) { return; }
    const form = this.userEditForm.form;
    if (form.valid) {
      this.submitDisabled = false;
    } else {
      this.submitDisabled = true;
    }

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(): void {
    if (this.userEditForm.form.valid) {
      const auth0Update: any = {};
      auth0Update.id = this.user.id;
      if (!this.isSocial) { auth0Update.email = this.user.email; }
      auth0Update.user_metadata = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        name: this.user.firstName + ' ' + this.user.lastName,
        admin: this.user.admin
      };
      this.userService.auth0Update(this.user.id, auth0Update)
        .then(success => success ? Promise.resolve() : Promise.reject(null))
        .then(() => this.userService.update(this.user.id, this.user))
        .then(user => this.router.navigate([ `overview/${user.id}` ]))
        .catch(err => {
          if (err) { console.error(err); }
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

  changePass(): void {
    this.userService
      .changePass(this.user.id)
      .then(ticket => window.open(ticket));
  }

}
