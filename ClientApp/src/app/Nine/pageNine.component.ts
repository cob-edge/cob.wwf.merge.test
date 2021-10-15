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
  @Input() recommendation: any;
  address_Input: string;
  recommendation_Output: string;

  ngOnInit(): void {
    this.address = {
      address_Input: ""
    }

    this.address_Input = this.address.address_Input;
    this.recommendation_Output = this.recommendation;
  }

  checkAddress() {
    var address = {
      address_Input: this.address
    }
    var recommendation = {
      recommendation_Output: this.recommendation
    }

    console.log("Input address: " + this.address);

    this.http.post<string>(this.baseUrl + 'carParkRecommendation', address).subscribe(res => {
      if (this.recommendation_Output == "") {
        alert("Can't make recommendation based on your input \"" + this.address + "\"");
      }
      else {
        alert("We recommend \"" + this.recommendation_Output + "\" based on your input");
      }
      
    });
  }
}
interface Address {
  address_Input: string;
  recommendation: string;
}
