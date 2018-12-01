import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import data from './data.json';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private categoryData: Categories = data as Categories;

  getCategories(): Categories {
    return this.categoryData;
  }

  getCategory(categoryIndex: number): Category {
    return this.categoryData.categories[categoryIndex];
  }

  getCategoryQuestions(categoryIndex: number): Question[] {
    return this.categoryData.categories[categoryIndex].questions;
  }

  getCategoryQuestion(categoryIndex: number, questionIndex: number): Question {
    return this.categoryData.categories[categoryIndex].questions[questionIndex];
  }

  getRandomQuestion(): QuestionIndex {
    let categoryIndex = Math.floor(Math.random() * Math.floor(this.categoryData.categories.length - 1));

    while (this.categoryData.categories[categoryIndex].questions.length === 0) {
      categoryIndex = Math.floor(Math.random() * Math.floor(this.categoryData.categories.length - 1));
    }

    const questionIndex = Math.floor(Math.random() * Math.floor(this.categoryData.categories[categoryIndex].questions.length));

    return new QuestionIndex(categoryIndex, questionIndex);
  }
}

export class QuestionIndex {
  public categoryIndex: number;
  public questionIndex: number;

  constructor(cI: number, qI: number) {
    this.categoryIndex = cI;
    this.questionIndex = qI;
  }
}

export class Categories {
  public categories: Category[];
}

export class Category {
  public title: string;
  public questions: Question[];
}

export class Question {
  public title: string;
  public answers: string[];
  public correct_answers: number[];
}
