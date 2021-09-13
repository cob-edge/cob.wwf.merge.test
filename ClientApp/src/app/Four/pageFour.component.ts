import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-Four',
  templateUrl: './pageFour.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Four implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;

  //chart js declaration
  title = 'livechart';
  chart;

  //api declaration
  public recentGases: RecentGas[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<RecentGas[]>(baseUrl + 'recentGas').subscribe(result => {
      this.recentGases = result;
      this.http = http;
      this.baseUrl = baseUrl;
      console.log(this.recentGases);
    }, error => console.error(error));
  }

  //api updates from database
  public http: HttpClient;
  public baseUrl: string;
  updateApiCall(http: HttpClient, baseUrl: string) {
    http.get<RecentGas[]>(baseUrl + 'recentGas').subscribe(result => {
      this.recentGases = result;
    }, error => console.error(error));
  }

  //run
  ngOnInit() {
    this.createTestChart();

    this.updateSubscription = interval(2000).subscribe(
      (val) => { this.updateStats() });
  }

  createTestChart() {
    //chart creation
    this.chart = new Chart('recentGasChart', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Realtime Charts'
        },
        scales: {

        }
      },
      data: {
        labels: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'],
        datasets: [
          {
            type: 'line',
            label: 'Live Speed detected by sensor',
            //data: [10, 3, 6, 11, 38, 5, 6, 17],
            backgroundColor: '#3F3FBF',
            fill: false
          }
        ]
      }
    });
  }

  updateStats() { //this method here does the live data refresh
    //this.getTable(this.http, this.baseUrl);

    //this.updateApiCall(this.http, this.baseUrl); //re runs the sql query to get 10 most recent v1 values

    console.log("hello from update status " + this.recentGases[0].recent10);
    this.chart.data.datasets[0].data = this.recentGases[0].recent10;
    this.chart.update();
  }


  //static table
  public iots: IoT[];
  getTable(http: HttpClient, baseUrl: string) {
    http.get<IoT[]>(baseUrl + 'iot').subscribe(result => {
      this.iots = result;
      console.log(this.iots);
    }, error => console.error(error));
  }
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

interface RecentGas {
  recent10: number[];
}

interface RecentV1 {
  recent10: number[];
}
