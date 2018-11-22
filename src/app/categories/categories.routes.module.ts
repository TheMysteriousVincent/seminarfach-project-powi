import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCategoriesComponent } from './categories.component';

const appRoutes: Routes = [
  { path: 'categories', component: AppCategoriesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppCategoriesRoutesModule {}
