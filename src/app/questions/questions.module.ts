
import { NgModule } from '@angular/core';
import { AppQuestionsComponent } from './questions.component';
import { AppQuestionsRoutesModule } from './questions.routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDividerModule, MatCardModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    AppQuestionsRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule
  ],
  declarations: [
    AppQuestionsComponent
  ],
  providers: [],
  exports: [
    AppQuestionsComponent
  ]
})
export class AppQuestionsModule {}
