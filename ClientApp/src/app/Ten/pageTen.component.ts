import { Component, OnInit, Input, Inject } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Ten',
  templateUrl: './pageTen.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Ten {

  //constructor(private service: SharedService) { }

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
      alert(res.toString());
      console.log(res.toString());
    });
  } 
}

interface Login {
  Login_Email_Input: string;
  Login_Password_Input: string;
}

