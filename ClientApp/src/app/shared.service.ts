import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  @Inject('BASE_URL') baseUrl: string;

  hardCodeUrl: "https://localhost:44366/";

  constructor(private http: HttpClient) { }

  addUser(val: any) {
    return this.http.post<User>("https://localhost:44366/"+ 'user', val)
  }

  checkUser(val: any) {
    return this.http.post<User>("https://localhost:44366/" + 'user', val)
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
  User_Address_Postcode: string;
  User_LicenseNo: string;
  User_LicenseExp: string;
}
