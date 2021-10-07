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

  @Input() user: any;
  user_ID: number;
  user_FirstName: string;
  user_LastName: string;
  user_Type: string;
  user_Email: string;
  user_Password: string;
  user_PhoneNo: string;
  user_Address_Street: string;
  user_Address_City: string;
  user_Address_Postcode: number;
  user_LicenseNo: string;
  user_LicenseExp: string;

  ngOnInit(): void {
    this.user = {
      user_ID: -1,
      user_FirstName: "",
      user_LastName: "",
      user_Type: "",
      user_Email: "",
      user_Password: "",
      user_PhoneNo: "",
      user_Address_Street: "",
      user_Address_City: "",
      user_Address_Postcode: "",
      user_LicenseNo: "",
      user_LicenseExp: ""
    }

    this.user_ID = this.user.User_ID; 
    this.user_FirstName = this.user.User_FirstName;
    this.user_LastName = this.user.User_LastName;
    this.user_Type = this.user.User_Type;
    this.user_Email = this.user.User_Email;
    this.user_Password = this.user.User_Password;
    this.user_PhoneNo = this.user.User_PhoneNo;
    this.user_Address_Street = this.user.User_Address_Street;
    this.user_Address_City = this.user.User_Address_City;
    this.user_Address_Postcode = this.user.User_Address_Postcode;
    this.user_LicenseNo = this.user.User_LicenseNo;
    this.user_LicenseExp = this.user.User_LicenseExp;
  }

  checkUser() {
    var val = {
      user_ID: /*this.user_ID*/ 401, //dummy and defaults exist
      user_FirstName: /*this.user_FirstName*/ "TestJarvis",
      user_LastName: /*this.user_LastName*/ "TestCole",
      user_Type: /*this.user_Type*/ "A",
      user_Email: this.user_Email, //in html 
      user_Password: this.user_Password, //in html
      user_PhoneNo: this.user_PhoneNo,
      user_Address_Street: this.user_Address_Street,
      user_Address_City: this.user_Address_City,
      user_Address_Postcode: this.user_Address_Postcode,
      user_LicenseNo: this.user_LicenseNo,
      user_LicenseExp: this.user_LicenseExp};
    console.log("User Email: " + this.user_Email);
    console.log("User Password: " + val.user_Password);

    this.http.post<User>(this.baseUrl + 'user', val).subscribe(res => {
      alert(res.toString());
      console.log(res.toString());
    });
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
