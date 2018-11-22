
import { Component } from '@angular/core';
import { AppDataService, Categories } from '../data/data.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class AppCategoriesComponent implements OnInit {
  public data: Categories;
  public fetched: boolean;

  public categoryIndex = -1;
  public nextStep = false;

  constructor(
    private questionData: AppDataService
  ) {}

  ngOnInit() {
    this.questionData.getCategories().subscribe(data => {
      this.fetched = true;
      this.data = data;
    });
  }
}
