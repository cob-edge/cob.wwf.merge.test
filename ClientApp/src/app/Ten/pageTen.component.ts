import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, tap } from "rxjs/operators";

@Component({
  selector: 'app-Ten',
  templateUrl: './pageTen.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Ten {
  //public recentV1s: RecentV1[];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  baseUrl: string

  @Input() login: any;
  login_Email_Input: string;
  login_Password_Input: string;

  ngOnInit(): void {
    this.login = {
      login_Email_Input: "",
      login_Password_Input: ""
    }

    this.login_Email_Input = this.login.login_Email_Input;
    this.login_Password_Input = this.login.login_Password_Input;
  }

  checkLogin() {
    var login = {
      login_Email_Input: this.login_Email_Input, //in html
      login_Password_Input: this.login_Password_Input, //in html

    }
    this.http.post<Login>(this.baseUrl + 'login', login).subscribe(res => {
      //alert(res.toString());
      console.log(res.toString()); //the user id 
    });

    this.getIPAddress();
  }

  ipAddress: string;
  getIPAddress() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        //console.log('th data', data.ip);
        this.ipAddress = data.ip;
      })
  }
}

interface Login {
  Login_Email_Input: string;
  Login_Password_Input: string;
}

