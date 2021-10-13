import { Component, OnInit, Input, Inject } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-Nine',
  templateUrl: './pageNine.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Nine {

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  baseUrl: string

  @Input() address: any;
  address_Input: string;
  recommendation: string;

  ngOnInit(): void {
    this.address = {
      address_Input: "",
      recommendation: ""
    }

    this.address_Input = this.address.address_Input;
    this.recommendation = this.address.recommendation;
  }

  checkAddress() {
    var address = {
      address_Input: this.address
    }
    var recommendation = {
      recommendation: this.recommendation
    }

    console.log("Input address: " + this.address);

    this.http.post<string>(this.baseUrl + 'carParkRecommendation', address).subscribe(res => {
      if (this.recommendation == "") {
        alert("Can't make recommendation based on your input \"" + this.address + "\"");
      }
      else {
        alert("We recommend \"" + recommendation + "\" based on your input");
        //console.log("Response: " + res.toString());
      }
      
    });
  }
}
interface Address {
  address_Input: string;
  recommendation: string;
}
