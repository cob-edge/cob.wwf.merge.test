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

  postData = {
    test: 'my content yoo'
  };

  public users: User[];
  /*
  constructor(private http: HttpClient) {
    this.http.post('https://httpbin.org/post', this.postData).toPromise().then(data => {
      console.log(data);
    })
  }
  */

  
  //public recentV1s: RecentV1[];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.user = {
      user_ID: 301,
      user_FirstName: "Hayley",
      user_LastName: "Mcmahon",
      user_Type: "M",
      user_Email: "natoque.penatibus@odiosagittis.org",
      user_PhoneNo: "0486 312 519        ",
      user_Address_Street: "974-1626 Elementum Rd.",
      user_Address_City: "Lewiston",
      user_Address_Postcode: 3837,
      user_LicenseNo: "533401519-00004     ",
      user_LicenseExp: "9/12/2024 12:00:00 AM"
    }

    console.log(this.user);

    //this.users[0] = this.user

    //console.log(this.users[0]);

    this.http.post<User>(baseUrl + 'user', this.user).subscribe(res => {
    alert(res.toString());
    })
  }
  

  @Input() user: any;
  User_ID: number;
  User_FirstName: string;
  User_LastName: string;
  User_Type: string;
  User_Email: string;
  User_Password: string;
  User_PhoneNo: string;
  User_Address_Street: string;
  User_Address_City: string;
  User_Address_Postcode: number;
  User_LicenseNo: string;
  User_LicenseExp: string;

  ngOnInit(): void {
    this.user = {
      User_ID: -1,
      User_FirstName: "",
      User_LastName: "",
      User_Type: "",
      User_Email: "",
      User_Password: "",
      User_PhoneNo: "",
      User_Address_Street: "",
      User_Address_City: "",
      User_Address_Postcode: -1,
      User_LicenseNo: "",
      User_LicenseExp: ""
    }

    this.User_ID = this.user.User_ID; 
    this.User_FirstName = this.user.User_FirstName;
    this.User_LastName = this.user.User_LastName;
    this.User_Type = this.user.User_Type;
    this.User_Email = this.user.User_Email;
    this.User_Password = this.user.User_Password;
    this.User_PhoneNo = this.user.User_PhoneNo;
    this.User_Address_Street = this.user.User_Address_Street;
    this.User_Address_City = this.user.User_Address_City;
    this.User_Address_Postcode = this.user.User_Address_Postcode;
    this.User_LicenseNo = this.user.User_LicenseNo;
    this.User_LicenseExp = this.user.User_LicenseExp;
  }

  checkUser() {
    var val = {
      User_ID: this.User_ID, //dummy and defaults exist
      User_FirstName: this.User_FirstName,
      User_LastName: this.User_LastName,
      User_Type: this.User_Type,
      User_Email: this.User_Email, //in html 
      User_Password: this.User_Password, //in html
      User_PhoneNo: this.User_PhoneNo,
      User_Address_Street: this.User_Address_Street,
      User_Address_City: this.User_Address_City,
      User_Address_Postcode: this.User_Address_Postcode,
      User_LicenseNo: this.User_LicenseNo,
      User_LicenseExp: this.User_LicenseExp};
    console.log("User Email TS: " + this.User_Email);
    console.log("User Password TS: " + val.User_Password);
    console.log("User Postcode: " + val.User_Address_Postcode);

    //this.service.checkUser(val).subscribe(res => {
    //  alert(res.toString());
    //});
  }
}

interface User {
  User_ID: number;
  User_FirstName: string;
  User_LastName: string;
  User_Type: string;
  User_Email: string;
  User_Password: string;
  User_PhoneNo: string;
  User_Address_Street: string;
  User_Address_City: string;
  User_Address_Postcode: number;
  User_LicenseNo: string;
  User_LicenseExp: string;
}



