import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare function findX(matA: any[], b: number): any;

@Component({
  selector: 'app-matrix-x-input',
  templateUrl: './matrix-x-input.component.html',
  styleUrls: ['./matrix-x-input.component.css'],
})
export class MatrixXInputComponent implements OnInit {
  @Input() size: number;
  @Input() epsilon: number;
  errorMsg: string | null = null;

  sizeMatrix: number[] = [];
  showResult: boolean = false;
  result: any = null;
  constructor(private fb: FormBuilder) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      matrix: this.fb.array([]),
      bMatrix: this.fb.array([]),
    });
    for (let i = 0; i < this.size; i++) {
      this.sizeMatrix.push(0);
    }
    this.addMatrix();
  }
  get matrix() {
    return this.form.get('matrix') as FormArray;
  }
  get bMatrix() {
    return this.form.get('bMatrix') as FormArray;
  }
  addMatrix() {
    for (let i = 0; i < this.size; i++) {
      const array = [];
      for (let j = 0; j < this.size; j++) {
        array.push(j);
      }
      const object = array.reduce((acc, value, index) => {
        return {
          ...acc,
          [value]: [
            null,
            [
              Validators.required,
              Validators.pattern('^-?(([1-9][0-9]*)|(0))(?:.[0-9]+)?$'),
            ],
          ],
        };
      }, {});
      const row = this.fb.group(object);
      this.matrix.push(row);
    }
    for (let i = 0; i < this.size; i++) {
      const object = {
        [i]: [
          null,
          [
            Validators.required,
            Validators.pattern('^-?(([1-9][0-9]*)|(0))(?:.[0-9]+)?$'),
          ],
        ],
      };
      const row = this.fb.group(object);
      this.bMatrix.push(row);
    }
  }
  handleSubmitMatrix(matrix: any, bMatrix: any) {
    const result: any[] = [];
    for (let i = 0; i < matrix.length; i++) {
      result.push([]);
    }
    matrix.forEach((item: any, index: number) => {
      for (let i = 0; i < matrix.length; i++) {
        result[index].push(item[i]);
      }
    });
    bMatrix.forEach((item: any, index: number) => {
      result[index].push(item[index]);
    });
    this.result = findX(result, this.epsilon);
    if (this.result) {
      this.form.disable();
      this.showResult = true;
      this.errorMsg = null;
    } else {
      this.errorMsg = 'Ma trận không chéo trội';
    }
    console.log(result);
  }
}
