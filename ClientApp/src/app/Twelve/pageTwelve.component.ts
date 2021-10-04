import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-twelve',
  templateUrl: './pagetwelve.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Twelve implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;

  //chart js declaration
  title = 'livechart';
  chart;

  title2 = 'livechart';
  chart2;

  title3 = 'livechart';
  chart3;

  title4 = 'livechart';
  chart4;


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
    this.createTestChart4();

    this.updateSubscription = interval(3000).subscribe(
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
          text: 'Cost Over Time For Etherum Carpark'
        },
        scales: {

        }
      },
      data: {
        labels: ['Dailey', 'Weekly', 'Monthly', 'Yearly'],
        datasets: [
          {
            type: 'bar',
            label: 'Cost (AUD)',
            data: [1, 1, 1, 1],
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
          text: 'Cost Over Time For Normal Carpark'
        },
        scales: {

        }
      },
      data: {
        labels: ['Dailey', 'Weekly', 'Monthly', 'Yearly'],
        datasets: [
          {
            type: 'bar',
            label: 'Cost (AUD)',
            data: [1, 1, 1, 1],
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
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Recent Charges on the Blockchain'
        },
        scales: {

        }
      },
      data: {
        labels: ['t-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'line',
            label: 'Cost (AUD)',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'blue'
          }
        ]
      }
    });
  }

  createTestChart4() {
    //chart creation
    this.chart4 = new Chart('canvas4', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Use of Pertrol Over Time', 
        },
        scales: {

        }
      },
      data: {
        labels: ['Dailey', 'Weekly', 'Monthly', 'Yearly'],
        datasets: [
          {
            type: 'bar',
            label: 'Live pause time (s) detected by sensor id 66',
            data: [1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false
          }
        ]
      }
    });
  }

  updateStats() { //this method here does the live data refresh
    //this.updateApiCall(this.http, this.baseUrl); //re runs the sql query to get 10 most recent v1 values
    this.updateApiCall2(this.http, this.baseUrl);
    this.updateApiCall3(this.http, this.baseUrl);

    //console.log("hello from update status chart : " + this.recentV1s[0].recent10);
    this.chart.data.datasets[0].data = [5, 33, 132, 1584];
    this.chart.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart2.data.datasets[0].data = [10, 68, 272, 3264];
    this.chart2.update();

    this.chart4.data.datasets[0].data = [3500, 24500, 95000, 1176000]
    this.chart4.update();

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






