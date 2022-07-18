import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixXInputComponent } from './matrix-x-input.component';

describe('MatrixXInputComponent', () => {
  let component: MatrixXInputComponent;
  let fixture: ComponentFixture<MatrixXInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixXInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixXInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
