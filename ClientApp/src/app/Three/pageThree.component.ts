import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators"

@Component({
  selector: 'app-three',
  templateUrl: './pageThree.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Three implements OnInit, OnDestroy {
  //live data declaration
  private updateSubscription: Subscription;
  componentDestroyed$: Subject<boolean> = new Subject()

  //chart js declaration
  title = 'livechart';
  chart;

   //chart js declaration
  title2 = 'livechart';
  chart2;

  //chart js declaration
  title3 = 'livechart';
  chart3;

  //api declaration
  public recentV1s: RecentV1[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<RecentV1[]>(baseUrl + 'recentV1').subscribe(result => {
      this.recentV1s = result;
      this.recentV2s = result;
      this.recentV3s = result;
      this.http = http;
      this.baseUrl = baseUrl;
    }, error => console.error(error));
  }

  //api updates from database V1
  public http: HttpClient;
  public baseUrl: string;
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
  ngOnInit() {
    this.createTestChart();
    this.createTestChart2();
    this.createTestChart3();

    this.updateSubscription = interval(5000)
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
          display: false,
          text: 'Realtime Charts',
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
            label: 'Speed (Km/Hr) detected',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
          display: false,
          text: 'Realtime Charts',
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
            label: 'Fuel (mL) detected',
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
          display: false,
          text: 'Realtime Charts',
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
            label: 'Pause time (seconds) detected',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'blue'
          }
        ]
      }
    });
  }

  updateStats() { //this method here does the live data refresh
    console.log("Hello from update data! Page Three");

    this.updateApiCall(this.http, this.baseUrl); //re runs the sql query to get 10 most recent v1 values
    this.updateApiCall2(this.http, this.baseUrl);
    this.updateApiCall3(this.http, this.baseUrl);

    this.chart.data.datasets[0].data = this.recentV1s[0].recent10;
    this.chart.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart2.data.datasets[0].data = this.recentV2s[0].recent10;
    this.chart2.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart3.data.datasets[0].data = this.recentV3s[0].recent10;
    this.chart3.update();
  }
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






