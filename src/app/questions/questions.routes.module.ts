import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppQuestionsComponent } from './questions.component';

const appRoutes: Routes = [
  { path: 'questions', component: AppQuestionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppQuestionsRoutesModule {}
