
import { NgModule } from '@angular/core';
import { AppCategoriesComponent } from './categories.component';
import { AppCategoriesRoutesModule } from './categories.routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDividerModule, MatCardModule, MatCheckboxModule, MatListModule, MatProgressSpinnerModule, MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    AppCategoriesRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  declarations: [
    AppCategoriesComponent
  ],
  providers: [],
  exports: [
    AppCategoriesComponent
  ]
})
export class AppCategoriesModule {}
