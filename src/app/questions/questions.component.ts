
import { Component } from '@angular/core';
import { AppDataService, Categories } from '../data/data.service';
import { OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class AppQuestionsComponent implements OnInit {
  public data: Categories;
  public fetched: boolean;
  public routeFetched: boolean;
  public randomQuestions: boolean;
  public routeCategory: number;
  public routeQuestion: number;
  public currentCategory = 0;
  public currentQuestion = 0;
  public step = 0;
  public randomAnswers: Answer[] = [];

  public getRandomAnswers(categoryIndex: number, questionIndex: number): Answer[] {
    let answers: Answer[] = [];

    for (let i = 0; i < this.data.categories[categoryIndex].questions[questionIndex].answers.length; i++) {
      answers.push(new Answer(
        this.data.categories[categoryIndex].questions[questionIndex].answers[i],
        i
      ));
    }

    answers = this.shuffleArray(answers);
    return answers;
  }

  private shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  constructor(
    private questionData: AppDataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.questionData.getCategories().subscribe(data => {
      this.fetched = true;
      this.data = data;
      this.randomAnswers = this.getRandomAnswers(this.currentCategory, this.currentQuestion);
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.randomQuestions = (params['random_questions'] === 'true');
      this.routeCategory = parseInt(params['current_category'], 10) || 0;
      if (this.routeCategory < 0) {
        this.routeCategory = 0;
      }
      this.currentQuestion = parseInt(params['current_question'], 10) || 0;
      if (this.currentQuestion < 0) {
        this.currentQuestion = 0;
      }
      this.routeFetched = true;
    });
  }

  nextQuestion() {
    this.currentCategory = Math.floor(Math.random() * this.data.categories.length);
    this.currentQuestion = Math.floor(Math.random() * this.data.categories[this.currentCategory].questions.length);
    this.step = 0;
  }

  nextRandomQuestion() {
  }
}

export class Answer {
  title: string;
  index: number;

  constructor(title: string, index: number) {
    this.title = title;
    this.index = index;
  }
}
