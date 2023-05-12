import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {

  @Input() control: AbstractControl | null | undefined;

  @Input() message: { [key: string]: string; }  = {};

  // @ts-ignore
  get errors(): string[] {
    if (this.control) {
      return Object.keys(this.control.errors || {});
    }
  }

}
