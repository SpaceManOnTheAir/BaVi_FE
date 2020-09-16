import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  //  form control
  @Input() formControl: any;

  //  ----Start ngModel-----
  modelData: string;
  @Input() get ngModel() {
    return this.modelData;
  }
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
  // tslint:disable-next-line: adjacent-overload-signatures
  set ngModel(value: string) {
    this.modelData = value;
    this.ngModelChange.emit(this.modelData);
  }
  //  ----End ngModel-----
  @Input() label = '';
  @Input() maxlength = 32767;
  @Input() placeholder = '';
  @Input() type = '';
  @Input() labelsize = 2;
  @Input() rows=1;
  colClass = {};
  //  ----Start Validation-----
  @Input() requiredError = false;
  @Input() requiredErrorMessage = 'Required field!!!';
  @Input() minlengthError = false;
  @Input() minlengthErrorMessage = 'Too short';
  @Input() emailRequiredError = false;
  @Input() emailRequiredErrorMessage = 'Invalid email';
  //  ----End Validation-----

  //  ----Start Enabled-----
  private enabledData = true;
  @Input() set enabled(value: boolean) {
    this.enabledData = value;
    if (value) {
      this.formControl.enable();
    }
    else { this.formControl.disable(); }
  }
  get enabled(): boolean {
    return this.enabledData;
  }
    //  ----End Enabled-----
  constructor() { }
  ngOnInit(): void {
    this.colClass['col-sm-' + this.labelsize] = true; // {'col-sm-2: true}
    // console.log(this.enableEdit);

  }



}
