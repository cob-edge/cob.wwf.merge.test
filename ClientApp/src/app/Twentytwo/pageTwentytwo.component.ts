import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-twentytwo',
  templateUrl: './pageTwentytwo.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Twentytwo implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;

  //chart js declaration
  title = 'livechart';
  chart;

  //chart js declaration
  title2 = 'livechart';
  chart2;

  //chart js declaration
  title3 = 'livechart';
  chart3;

  //chart js declaration
  title4 = 'livechart';
  chart4;


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
    this.createTestChart();
    this.createTestChart2();
    this.createTestChart3();
    this.createTestChart4();

    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.updateStats() });
  }

  createTestChart() {
    //chart creation
    this.chart = new Chart('canvas', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Cost Over Time For User dictum.Proin.eget@DonecegestasAliquam.org'
        },
        scales: {

        }
      },
      data: {
        labels: ['t-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'line',
            label: 'Cost (AUD)',
            data: [1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'blue'
          }
        ]
      }
    });
  }

  createTestChart2() {
    //chart creation
    this.chart2 = new Chart('canvas2', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Cost Over Time For User dictum.Proin.eget@DonecegestasAliquam.org'
        },
        scales: {

        }
      },
      data: {
        labels: ['t-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'line',
            label: 'Cost (ETH)',
            data: [1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'blue'
          }
        ]
      }
    });
  }

  createTestChart3() {
    //chart creation
    this.chart3 = new Chart('canvas3', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Most Recent Costs (Aud)',
        },
        scales: {

        }
      },
      data: {
        labels: ['t-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'line',
            label: 'A',
            backgroundColor: '#3F3FBF',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            fill: false,
            borderColor: 'blue'
          },
          {
            type: 'line',
            label: 'B',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(54,162,235)'
          },
          {
            type: 'line',
            label: 'C',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(129,161,242)'
          },
          {
            type: 'line',
            label: 'D',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(0,161,172)'
          },
          {
            type: 'line',
            label: 'E',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(0,242,227)'
          }
        ]
      }
    });
  }

  createTestChart4() {
    //chart creation
    this.chart4 = new Chart('canvas4', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Most Recent Costs (Wei)',
        },
        scales: {

        }
      },
      data: {
        labels: ['t-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'line',
            label: 'A',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'blue'
          },
          {
            type: 'line',
            label: 'B',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(54,162,235)'
          },
          {
            type: 'line',
            label: 'C',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(129,161,242)'
          },
          {
            type: 'line',
            label: 'D',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(0,161,172)'
          },
          {
            type: 'line',
            label: 'E',
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'rgb(0,242,227)'
          }
        ]
      }
    });
  }

  User_ID: number;
  updateStats() { //this method here does the live data refresh

    //console.log("hello from update status chart : " + this.recentV1s[0].recent10);
    this.chart.data.datasets[0].data = [0.25, 0.35, 0.26, 0.10];
    this.chart.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart2.data.datasets[0].data = [0.000060, 0.000085, 0.000063, 0.000024];
    this.chart2.update();

    this.chart4.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart3.update();

    this.getChartDataChart3Chart4();
  }

  getChartDataChart3Chart4() {
    this.http.get<RecentCosts>(this.baseUrl + 'recentCosts/' + 0).subscribe(result => {

      
      this.chart4.data.datasets[0].data = result.user_Costs[0];
      this.chart4.data.datasets[1].data = result.user_Costs[1];
      this.chart4.data.datasets[2].data = result.user_Costs[2];
      this.chart4.data.datasets[3].data = result.user_Costs[3];
      this.chart4.data.datasets[4].data = result.user_Costs[4];

      this.chart3.data.datasets[0].data = result.user_CostAuds[0];
      this.chart3.data.datasets[1].data = result.user_CostAuds[1];
      this.chart3.data.datasets[2].data = result.user_CostAuds[2];
      this.chart3.data.datasets[3].data = result.user_CostAuds[3];
      this.chart3.data.datasets[4].data = result.user_CostAuds[4];

      this.chart4.data.datasets[0].label = result.user_Emails[0]; //first email 
      this.chart4.data.datasets[1].label = result.user_Emails[1]; //so on
      this.chart4.data.datasets[2].label = result.user_Emails[2];
      this.chart4.data.datasets[3].label = result.user_Emails[3];
      this.chart4.data.datasets[4].label = result.user_Emails[4];

      this.chart3.data.datasets[0].label = result.user_Emails[0]; //first email 
      this.chart3.data.datasets[1].label = result.user_Emails[1]; //so on
      this.chart3.data.datasets[2].label = result.user_Emails[2];
      this.chart3.data.datasets[3].label = result.user_Emails[3];
      this.chart3.data.datasets[4].label = result.user_Emails[4];
      

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

interface RecentCosts {
  user_Emails: string[];
  user_Costs: number[][];
  user_CostAuds: number[][];
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





