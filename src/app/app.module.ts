import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { AppComponent } from './app.component';
import { EpsilonInputComponent } from './epsilon-input/epsilon-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrixInputComponent } from './matrix-input/matrix-input.component';
import { ShowResultComponent } from './show-result/show-result.component';
import { MatrixXInputComponent } from './matrix-x-input/matrix-x-input.component';

@NgModule({
  declarations: [AppComponent, EpsilonInputComponent, MatrixInputComponent, ShowResultComponent, MatrixXInputComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
