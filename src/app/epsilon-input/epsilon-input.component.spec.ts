import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsilonInputComponent } from './epsilon-input.component';

describe('EpsilonInputComponent', () => {
  let component: EpsilonInputComponent;
  let fixture: ComponentFixture<EpsilonInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpsilonInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsilonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
