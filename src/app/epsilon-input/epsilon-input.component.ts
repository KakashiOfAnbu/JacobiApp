import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-epsilon-input',
  templateUrl: './epsilon-input.component.html',
  styleUrls: ['./epsilon-input.component.css'],
})
export class EpsilonInputComponent implements OnInit {
  myForm: FormGroup;
  eLabel = 'Epsilon';
  mLabel = 'Kích Cỡ Ma Trận(N x N)';
  matrixInput: boolean = false;
  matrixXInput: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      epsilon: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.max(1),
          Validators.min(0.0000000000001),
          Validators.pattern('^-?(([1-9][0-9]*)|(0))(?:.[0-9]+)?$'),
        ],
      ],
      matrixSize: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.min(2),
          Validators.max(10),
          Validators.pattern('^-?(([1-9][0-9]*)|(0))(?:.[0-9]+)?$'),
        ],
      ],
    });
  }
  get epsilon() {
    return this.myForm.get('epsilon');
  }
  get matrixSize() {
    return this.myForm.get('matrixSize');
  }

  handleSubmitEpsilon(value: any, event: any) {
    if (event === 'findA1') {
      console.log(value);
      this.myForm.disable();
      this.matrixInput = true;
    } else if (event === 'findX') {
      this.myForm.disable();
      this.matrixXInput = true;
    }
  }
}
