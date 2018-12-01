
import { Component } from '@angular/core';
import { AppDataService, Categories, Question } from '../data/data.service';
import { OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  MatButton, MatButtonModule,
  MAT_CHECKBOX_CLICK_ACTION
} from '@angular/material';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }
  ]
})
export class AppQuestionsComponent implements OnInit {
  constructor(
    public questionData: AppDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public routeFetched: boolean;
  public randomQuestions: boolean;
  public routeCategory: number;
  public routeQuestion: number;
  public currentCategory = 0;
  public currentQuestion = 0;
  public solutionActive: boolean;
  public q: Question;
  public a1: Answer;
  public a2: Answer;
  public a3: Answer;
  public a1_checked = false;
  public a2_checked = false;
  public a3_checked = false;

  public getRandomAnswers(question: Question): Answer[] {
    let answers: Answer[];
    answers = this.shuffleArray(this.getQuestionAnswers(question));
    return answers;
  }

  private getQuestionAnswers(question: Question): Answer[] {
    const answers: Answer[] = [];
    for (let i = 0; i < Math.min(3, question.answers.length); i++) {
      answers.push(new Answer(
        question.answers[i],
        i,
        question.correct_answers.includes(i)
      ));
    }
    return answers;
  }

  private setAnswers(answers: Answer[]) {
    switch (answers.length) {
      case 0:
        this.a1 = null;
        this.a2 = null;
        this.a3 = null;
        break;
      case 1:
        this.a1 = answers[0];
        this.a2 = null;
        this.a3 = null;
        break;
      case 2:
        this.a1 = answers[0];
        this.a2 = answers[1];
        this.a3 = null;
        break;
      case 3:
        this.a1 = answers[0];
        this.a2 = answers[1];
        this.a3 = answers[2];
        break;
    }
  }

  public nextQuestion() {
    let nextQuestion: Question;
    if (this.randomQuestions) {
      let qIs = this.questionData.getRandomQuestion();
      while (qIs.categoryIndex === this.currentCategory && qIs.questionIndex === this.currentQuestion) {
        qIs = this.questionData.getRandomQuestion();
      }

      nextQuestion = this.questionData.getCategoryQuestion(qIs.categoryIndex, qIs.questionIndex);
      this.currentCategory = qIs.categoryIndex;
      this.currentQuestion = qIs.questionIndex;
    } else {
      const category = this.questionData.getCategory(this.currentCategory);

      if (this.currentQuestion + 1 < category.questions.length) {
        nextQuestion = this.questionData.getCategoryQuestion(this.currentCategory, this.currentQuestion + 1);
        this.currentQuestion += 1;
      } else {
        this.router.navigateByUrl('/categories');
        return;
      }
    }

    this.solutionActive = false;
    this.a1_checked = false;
    this.a2_checked = false;
    this.a3_checked = false;
    this.q = nextQuestion;
    this.setAnswers(this.getQuestionAnswers(nextQuestion));
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
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.randomQuestions = (params['random_questions'] === 'true');
      this.currentCategory = parseInt(params['category_index'], 10) || 0;
      if (this.currentCategory < 0) {
        this.currentCategory = 0;
      }
      this.currentQuestion = parseInt(params['question_index'], 10) || 0;
      if (this.currentQuestion < 0) {
        this.currentQuestion = 0;
      }

      this.routeFetched = true;
      const q = this.questionData.getCategoryQuestion(this.currentCategory, this.currentQuestion);
      this.q = q;
      this.setAnswers(this.getRandomAnswers(q));
    });
  }
}

export class Answer {
  title: string;
  index: number;
  correct: boolean;

  constructor(title: string, index: number, correct: boolean) {
    this.title = title;
    this.index = index;
    this.correct = correct;
  }
}
