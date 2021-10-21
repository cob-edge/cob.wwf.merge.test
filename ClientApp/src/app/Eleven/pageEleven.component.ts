import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-eleven',
  templateUrl: './pageEleven.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Eleven implements OnInit {
  //live data declaration
  private updateSub: Subscription;
  componentDestroyed$: Subject<boolean> = new Subject()

  //chart js declaration
  title = 'livechart';
  chart;

  title2 = 'livechart';
  chart2;

  title3 = 'livechart';
  chart3;

  //api declaration
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  //api variables 
  public http: HttpClient;
  public baseUrl: string;

  //run
  async ngOnInit() {
    this.createTestChart();
    this.createTestChart2();
    this.createTestChart3();

    this.User_ID = -1; // initialisation

    this.getIPAddress();

    this.getUserData();

    this.updateSub = interval(3000)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (val) => { this.updateStats() });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  createTestChart() {
    //chart creation
    this.chart = new Chart('canvas', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'My Recent Ethereum Costs',
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
            label: 'Costs (Wei)',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            borderColor: 'rgb(63,63,191)',
            fill: false
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
          text: 'My Recent Costs In Australian Dollars',
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
            label: 'Costs (AUD)',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            borderColor: 'rgb(63,63,191)',
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
        },
        scale: {
          pointLabels: {
            fontColor: 'white',
            fontSize: 12
          }
        },
        legend: {
          labels: {
            fontColor: "white"
          }
        }
      }
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
    console.log("Hello from update data! Page Eleven");

    this.getChartDataChart1Chart2();
    this.chart.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart2.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart3.data.datasets[0].data = [140, 203, 80, 16];
    this.chart3.update();
  }

  getChartDataChart1Chart2() {
    this.http.get<RecentCost>(this.baseUrl + 'recentCost/' + this.User_ID).subscribe(result => {
      this.chart.data.datasets[0].data = result.recent10;

      this.chart2.data.datasets[0].data = result.recent10Aud;
    }, error => console.error(error));
  }

  getChartDataChart3() { // to be tested
    this.http.get<RecentTotalCarParkCost>(this.baseUrl + 'recentTotalCarParkCost/' + this.User_ID).subscribe(result => {
      this.chart3.data.datasets[0].data = result.recent4Aud;
    }, error => console.error(error));
  }

  async getUserData() {
    await new Promise(f => setTimeout(f, 1000)); //wait for API to get address

    this.http.get<User>(this.baseUrl + 'user/' + this.ipAddress).subscribe(result => {
      console.log(result.user_ID);
      //result = this.user;
      this.User_ID = result.user_ID;
    }, error => console.error(error));
  }
  private user: User;

  ipAddress: string;
  getIPAddress() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data.ip;
      })
  }
}

interface RecentTotalCarParkCost {
  recent4: number[];
  recent4Aud: number[];
}

interface RecentCost {
  recent10: number[];
  recent10Aud: number[];
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







