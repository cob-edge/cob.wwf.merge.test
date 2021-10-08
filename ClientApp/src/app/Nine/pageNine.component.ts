import { Component, OnInit, Input, Inject } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Nine',
  templateUrl: './pageNine.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Nine {

  //constructor(private service: SharedService) { }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  baseUrl: string

  @Input() address: any;
  address_Input: string;

  ngOnInit(): void {
    this.address = {
      address_Input: ""
    }

    this.address_Input = this.address.address_Input;
  }

  checkAddress() {
    var address = {
      address_Input: this.address
    }

    console.log("Input address: " + this.address);

    this.http.post<string>(this.baseUrl + 'carParkRecommendation', address).subscribe(res => {
      alert("Input address \"" + this.address + "\" received successfully");
      //console.log("Response: " + res.toString());
    });
  }
}
interface Address {
  address_Input: string;
}
