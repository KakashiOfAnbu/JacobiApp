import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css'],
})
export class ShowResultComponent implements OnInit {
  @Input() result: any = {};
  matrix: any[] = [];
  matrixType: string;
  iteration: number;
  hesoco: number;
  message: string | null = null;
  constructor() {}

  ngOnInit(): void {
    console.log(this.result);
    this.matrix = this.result.matrix;
    this.matrixType = this.result.matrixType;
    this.iteration = this.result.count;
    this.hesoco = this.result.q;
    if (this.matrixType === 'row') {
      this.message = 'Ma trận đã cho chéo trội hàng';
    } else if (this.matrixType === 'column') {
      this.message = 'Ma trận đã cho chéo trội cột';
    }
  }
}
