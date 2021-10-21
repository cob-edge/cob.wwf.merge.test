import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-twentytwo',
  templateUrl: './pageTwentytwo.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Twentytwo implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;
  componentDestroyed$: Subject<boolean> = new Subject()

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
    this.createTestChart2();
    this.createTestChart3();
    this.createTestChart4();

    this.segment5 = 0;

    this.User_ID = -1; // initialisation

    this.getIPAddress();

    this.getUserData();

    this.updateSubscription = interval(3000)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (val) => { this.updateStats() });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  createTestChart2() {
    //chart creation
    this.chart2 = new Chart('canvas2', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Recent Processing Times For Each of the Users Blocks',
          fontColor: 'white'
        },
        legend: {
          labels: {
            fontColor: "white"
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
            }
          }]
        }
      },
      data: {
        labels: ['t-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'line',
            label: 'Time (seconds)',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
          fontColor: 'white'
        },
        legend: {
          labels: {
            fontColor: "white"
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
            }
          }]
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
          fontColor: 'white'
        },
        legend: {
          labels: {
            fontColor: "white"
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
            }
          }]
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

  nextBatch() {
    this.segment5++;
  }

  public segment5: number;
  User_ID: number;
  updateStats() { //this method here does the live data refresh
    console.log("Hello from update data! Page Twentytwo");

    this.getChartDataChart2();
    this.chart2.update();

    this.getChartDataChart3Chart4();
    this.chart4.update();
    this.chart3.update();
  }

  getChartDataChart2() {
    this.http.get<RecentBlockTimeDif>(this.baseUrl + 'recentBlockTimeDif').subscribe(result => {
      this.chart2.data.datasets[0].data = result.recent10;
      //console.log(result.Recent10);
    }, error => console.error(error));
  }

  getChartDataChart3Chart4() {
    this.http.get<RecentCosts>(this.baseUrl + 'recentCosts/' + this.segment5).subscribe(result => {

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

  async getUserData() {
    await new Promise(f => setTimeout(f, 1000)); //wait for API to get address

    this.http.get<User>(this.baseUrl + 'user/' + this.ipAddress).subscribe(result => {
      console.log(result.user_ID);
      this.User_ID = result.user_ID;
    }, error => console.error(error));
  }

  ipAddress: string;
  getIPAddress() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data.ip;
      })
  }
}

interface RecentCosts {
  user_Emails: string[];
  user_Costs: number[][];
  user_CostAuds: number[][];
}

interface RecentBlockTimeDif {
  recent10: number[][];
}

interface User {
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
  user_IP_Address: string;
}





