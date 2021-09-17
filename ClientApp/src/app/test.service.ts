import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tester } from './Tester';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  _url = 'http://localhost:3000/testing';
  constructor(private _http: HttpClient) { }

  testing(tester: Tester) {
    return this._http.post<any>(this._url, tester);
  }
}
