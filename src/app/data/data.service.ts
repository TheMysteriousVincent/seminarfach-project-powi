import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>('./assets/data.json');
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

/*export class TokenRequest {
  data: {
    username: string;
    email: string;
    password: string;
  };
  forms: {
    openid_ns: string;
    openid_mode: string;
    openid_op_endpoint: string;
    openid_claimed_id: string;
    openid_identity: string;
    openid_return_to: string;
    openid_response_nonce: string;
    openid_assoc_handle: string;
    openid_signed: string;
    openid_sig: string;
  };
}

export class TokenResult {
  err: boolean;
  errMsg: string;
  data: {
    refresh_token: string;
    access_token: string;
  };
  constructor() {}
}*/
