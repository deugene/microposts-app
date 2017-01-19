import {
  Component, Input, Output, EventEmitter, ViewChild, AfterViewChecked
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Micropost } from '../../micropost';

import { MicropostService } from '../../micropost.service';

@Component({
  selector: 'app-micropost-edit',
  templateUrl: './micropost-edit.component.html',
  styleUrls: ['./micropost-edit.component.css']
})
export class MicropostEditComponent implements AfterViewChecked {
  @Input() currentId: string;
  @Input() mode: string;
  @Input() micropost = new Micropost();

  @Output() refresh = new EventEmitter<boolean>();

  micropostForm: NgForm;
  @ViewChild('micropostForm') currentForm: NgForm;

  submitDisabled = true;

  formErrors = { 'body': '' };

  validationMessages = {
    'body': {
      'required': 'Content is required.',
      'pattern': 'Max length is 140 characters'
    }
  };

  constructor(private micropostService: MicropostService) { }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.micropostForm) { return; }
    this.micropostForm = this.currentForm;
    if (this.micropostForm) {
      this.micropostForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any): void {
    if (!this.micropostForm) { return; }
    const form = this.micropostForm.form;
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
    if (this.micropostForm.form.valid) {
      Promise.resolve((): Promise<Micropost> => {
        if (this.mode === 'edit') {
          return this.micropostService
            .update(this.micropost.id, { body: this.micropost.body });
        }
        this.micropost.userId = this.currentId;
        return this.micropostService.create(this.micropost);
      })
      .then(() => {
        this.refresh.emit();
        this.micropostForm.reset();
      });
    }
  }

}
