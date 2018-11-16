
import { NgModule } from '@angular/core';
import { AppDashboardComponent } from './dashboard.component';
import { AppDashboardRoutesModule } from './dashboard.routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDividerModule, MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    AppDashboardRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule
  ],
  declarations: [
    AppDashboardComponent
  ],
  providers: [],
  exports: [
    AppDashboardComponent
  ]
})
export class AppDashboardModule {}
