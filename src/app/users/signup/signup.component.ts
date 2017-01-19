import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';

import { User } from '../../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewChecked {
  submitDisabled = true;
  newUser = new User();

  signupForm: NgForm;
  @ViewChild('signupForm') currentForm: NgForm;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'pattern': 'Wrong email format'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must contain at least 6 characters, including digits, uppercase and lowercase letters'
    }
  };

  constructor(
    private auth: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged(): void {
    if (this.currentForm === this.signupForm) { return; }
    this.signupForm = this.currentForm;
    if (this.signupForm) {
      this.signupForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any): void {
    if (!this.signupForm) { return; }
    const form = this.signupForm.form;
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
    if (this.signupForm.form.valid) {
      this.auth.signUp(this.newUser.email, this.newUser.password);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
