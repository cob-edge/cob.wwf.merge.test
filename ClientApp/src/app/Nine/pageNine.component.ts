import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//calls for other page requirements to be validated 
@Component({
  selector: 'app-Nine',
  templateUrl: './pageNine.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Nine {
  public users: User[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<User[]>(baseUrl + 'user').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }
}

interface User {
  user_ID: number;
  user_FirstName: string;
  user_LastName: string;
  userType: string;
  user_Email: string;
}

