import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare function findInverseMatrix(matA: any[], b: number): any;

@Component({
  selector: 'app-matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.css'],
})
export class MatrixInputComponent implements OnInit {
  @Input() size: number;
  @Input() epsilon: number;
  errorMsg: string | null = null;
  // size = 4;
  // epsilon = 0.000001;
  sizeMatrix: number[] = [];
  showResult: boolean = false;
  result: any = null;
  constructor(private fb: FormBuilder) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      matrix: this.fb.array([]),
    });
    for (let i = 0; i < this.size; i++) {
      this.sizeMatrix.push(0);
    }
    this.addMatrix();
  }
  get matrix() {
    return this.form.get('matrix') as FormArray;
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
  }
  handleSubmitMatrix(matrix: any) {
    const result: any[] = [];
    for (let i = 0; i < matrix.length; i++) {
      result.push([]);
    }
    matrix.forEach((item: any, index: number) => {
      for (let i = 0; i < matrix.length; i++) {
        result[index].push(item[i]);
      }
    });
    if (findInverseMatrix(result, this.epsilon)) {
      this.form.disable();
      this.showResult = true;
      this.errorMsg = null;
      this.result = findInverseMatrix(result, this.epsilon);
    } else {
      this.errorMsg = 'Ma trận không chéo trội';
    }
  }
}
