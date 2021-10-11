import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-eleven',
  templateUrl: './pageEleven.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Eleven implements OnInit {
  //live data declaration
  private updateSub: Subscription;
  private updateSlowSub: Subscription;

  //chart js declaration
  title = 'livechart';
  chart;

  title2 = 'livechart';
  chart2;

  title3 = 'livechart';
  chart3;

  //api declaration
  public recentV1s: RecentV1[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;

    http.get<RecentV1[]>(baseUrl + 'recentV1').subscribe(result => {
      this.recentV1s = result;
      this.recentV2s = result;
      this.recentV3s = result;
    }, error => console.error(error));
  }

  //api updates from database V1
  public http: HttpClient;
  public baseUrl: string;

  //update adpi call 
  updateApiCall(http: HttpClient, baseUrl: string) {
    http.get<RecentV1[]>(baseUrl + 'recentV1').subscribe(result => {
      this.recentV1s = result;
    }, error => console.error(error));
  }

  //other api updates from database V2
  public recentV2s: RecentV2[];
  updateApiCall2(http: HttpClient, baseUrl: string) {
    http.get<RecentV2[]>(baseUrl + 'recentV2').subscribe(result => {
      this.recentV2s = result;
    }, error => console.error(error));
  }

  //other api updates from database V3
  public recentV3s: RecentV2[];
  updateApiCall3(http: HttpClient, baseUrl: string) {
    http.get<RecentV3[]>(baseUrl + 'recentV3').subscribe(result => {
      this.recentV3s = result;
    }, error => console.error(error));
  }

  //run
  async ngOnInit() {
    this.createTestChart();
    this.createTestChart2();
    this.createTestChart3();

    await this.getIPAddress();

    this.updateSub = interval(3000).subscribe(
      (val) => { this.updateStats() });
  }

  createTestChart() {
    //chart creation
    this.chart = new Chart('canvas', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'My Ethereum Costs (AUD) of Past Day'
        },
        scales: {

        }
      },
      data: {
        labels: ['t-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'bar',
            label: 'Costs (AUD) of Past Day',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false
          }
        ]
      }
    });
  }

  createTestChart2() {
    //chart creation
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Equivalent CarPark Costs of Past Day'
        },
        scales: {

        }
      },
      data: {
        labels: ['t-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'bar',
            label: 'Costs (AUD) of Past Day',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false
          }
        ]
      }
    });
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
      label: 'Total Costs Across Carparks (AUD)',
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
  updateStats() {
    this.User_ID = 14;
    this.getUserData();

    //this method here does the live data refresh
    //this.updateApiCall(this.http, this.baseUrl); //re runs the sql query to get 10 most recent v1 values
    //this.updateApiCall2(this.http, this.baseUrl);
    //this.updateApiCall3(this.http, this.baseUrl);

    console.log("hello from update status chart : " + this.recentV1s[0].recent10);
    this.getChartData();
    this.chart.update();




    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart2.data.datasets[0].data = [2, 9, 3, 5, 9, 7, 13, 20, 12, 10];
    this.chart2.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart3.data.datasets[0].data = [140, 203, 80, 16];
    this.chart3.update();
  }

  getChartData() {
    this.http.get<RecentCost>(this.baseUrl + 'recentCost/' + this.User_ID).subscribe(result => {
      this.chart.data.datasets[0].data = result.recent10;
    }, error => console.error(error));
  }

  getUserData() {
    this.http.get<User>(this.baseUrl + 'user/' + this.ipAddress).subscribe(result => {
      this.User_ID = result.User_ID;
    }, error => console.error(error));
  }

  ipAddress: string;
  async getIPAddress() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data.ip;
      })
  }
}

interface RecentCost {
  recent10: number[];
}

interface RecentV1 {
  recent10: number[];
}

interface RecentV2 {
  recent10: number[];
}

interface RecentV3 {
  recent10: number[];
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







