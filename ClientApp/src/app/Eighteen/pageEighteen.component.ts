import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-eighteen',
  templateUrl: './pageEighteen.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Eighteen implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;

  //chart js declaration
  title3 = 'livechart';
  chart3;

  //api declaration
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.http = http;
      this.baseUrl = baseUrl;
  }

  //api updates from database V1
  public http: HttpClient;
  public baseUrl: string;

  //run
  ngOnInit() {
    this.createTestChart3();

    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.updateStats() });
  }

  createTestChart3() {
    //chart creation
    this.chart3 = new Chart('canvas3', {
      type: 'radar',
      data: this.data,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    });
  }

  public data = {
    labels: [
      'Car Park 3 La Trobe',
      'Epping Puma',
      'T1, T2, T3 Car Park',
      'Wilson Parking'
    ],
    datasets: [{
      label: 'Total Cars Currently Parked Across Network As a Percentage',
      data: [1, 1, 1, 1],
      fill: true,
      backgroundColor: 'rgb(63,63,191, 0.2)',
      borderColor: 'rgb(63,63,191)',
      pointBackgroundColor: 'rgb(63,63,191)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(63,63,191)'
    }]
  };

  User_ID: number;
  updateStats() { //this method here does the live data refresh
    this.getChartDataChart3()
    this.chart3.update();
  }

  getChartDataChart3() {
    this.http.get<RecentCarParkFill>(this.baseUrl + 'recentCarParkFill').subscribe(result => {
      this.chart3.data.datasets[0].data = result.recent4;
    }, error => console.error(error));
  }

  ipAddress: string;
  async getIPAddress() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data.ip;
      })
  }

  getUserData() {
    this.http.get<User>(this.baseUrl + 'user/' + this.ipAddress).subscribe(result => {
      this.User_ID = result.User_ID;
    }, error => console.error(error));
  }
}

interface RecentCarParkFill {
  recent4: number[];
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
  User_IP_Address: string;
}






