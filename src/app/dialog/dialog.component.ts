import { Component, Input, Output, EventEmitter, animate, trigger,
         transition, style } from '@angular/core';

export interface DialogOptions {
  visible: boolean;
  type: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.css' ],
  exportAs: 'dialog',
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent {
  @Input() dialogOptions: DialogOptions;
  @Output() dialogOptionsChange = new EventEmitter<DialogOptions>();

  cancel(): void {
    this.dialogOptions.visible = false;
    this.dialogOptionsChange.emit(this.dialogOptions);
  }
}
