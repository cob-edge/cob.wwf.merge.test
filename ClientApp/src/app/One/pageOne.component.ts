import { Component, OnInit, Inject} from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-one',
  templateUrl: './pageOne.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class One implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;

  //chart js declaration
  title = 'livechart';
  chart;

  //api declaration
  /*
  public iots: IoT[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IoT[]>(baseUrl + 'iot').subscribe(result => {
      this.iots = result;
    }, error => console.error(error));
  }
  */

  //api declaration
  public recentV1s: RecentV1[];
  public one: One;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<RecentV1[]>(baseUrl + 'recentV1').subscribe(result => {
      this.recentV1s = result;
      this.http = http;
      this.baseUrl = baseUrl;
    }, error => console.error(error));
  }
  
  //api updates from database
  public http: HttpClient;
  public baseUrl: string; 
  updateApiCall(http: HttpClient, baseUrl: string) {
    http.get<RecentV1[]>(baseUrl + 'recentV1').subscribe(result => {
      this.recentV1s = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.createTestChart();
    
    this.updateSubscription = interval(2000).subscribe(
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
          text: 'Realtime Charts'
        },
      },
      data: {
        labels: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'],
        datasets: [
          {
            type: 'bar',
            label: 'Test Chart',
            //data: [10, 3, 6, 11, 38, 5, 6, 17],
            backgroundColor: '#3F3FBF',
            fill: false
          }
        ]
      }
    });
  }

  updateStats() { //this method here does the live data refresh
    this.updateApiCall(this.http, this.baseUrl);

    console.log("hello from update status " + this.recentV1s[0].recent10);
    this.chart.data.datasets[0].data = this.recentV1s[0].recent10;
    this.chart.update();
    //console.log("NEW DATA UPDATE");
  }
}

interface RecentV1 {
  recent10: number[];
}

interface IoT {
  sensorId: number;
  timeStamp: string;
  description: string;
  type: string;
  v1: number;
  v2: number;
  v3: number;
  latitude: number;
  longitude: number;
}
