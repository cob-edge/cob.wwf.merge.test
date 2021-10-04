import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-nineteen',
  templateUrl: './pageNineteen.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Nineteen implements OnInit {
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
      type: 'doughnut',
      options: {
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        responsive: true,
        title: {
          display: true,
          text: 'Cost Daily For Your Cars'
        },
        scales: {

        }
      },
      data: this.data1
    });
  }

  createTestChart2() {
    //chart creation
    this.chart2 = new Chart('canvas2', {
      type: 'doughnut',
      options: {
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        responsive: true,
        title: {
          display: true,
          text: 'Cost Weekly For Your Cars'
        },
        scales: {

        }
      },
      data: this.data2
    });
  }

  createTestChart3() {
    //chart creation
    this.chart3 = new Chart('canvas3', {
      type: 'bar',
      data: this.data3,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
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
          text: 'Active Running IoT Sensor on Block Chain Network',
        },
        scales: {

        }
      },
      data: {
        labels: ['Start of Sim', 'Mid Sim', 'Mid Sim', 'End of Sim'],
        datasets: [
          {
            type: 'line',
            label: 'Live Sensor Amount',
            data: [1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'blue'
          }
        ]
      }
    });
  }

  updateStats() { //this method here does the live data refresh
    //this.updateApiCall(this.http, this.baseUrl); //re runs the sql query to get 10 most recent v1 values
    //this.updateApiCall2(this.http, this.baseUrl);
    //this.updateApiCall3(this.http, this.baseUrl);

    //console.log("hello from update status chart : " + this.recentV1s[0].recent10);
    //this.chart.data.datasets[0].data = [5, 1, 4, 8];
    //this.chart.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    //this.chart2.data.datasets[0].data = [35, 7, 20, 40];
    //this.chart2.update();

    this.chart4.data.datasets[0].data = [0, 2, 50, 1]
    this.chart4.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart3.data.datasets[0].data = [35, 7, 20, 40]
    this.chart3.update();


  }

  public data1 = {
    labels: [
      'id.libero.Donec@mauris.edu',
      'ridiculus.mus@ipsum.com',
      'sit.amet@Nullam.co.uk',
      'aliquet.diam@semmollis.net'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [1, 1, 1, 1],
      backgroundColor: [
        'rgb(63,63,191)',
        'rgb(54,162,235)',
        'rgb(129,161,242)',
        'rgb(0,161,172)'
      ]
    }]
  };

  public data2 = {
    labels: [
      '6SR-D14',
      '5NQ-D93',
      '7MQ-F06',
      '0TI-K06'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [1, 1, 1, 1],
      backgroundColor: [
        'rgb(63,63,191)',
        'rgb(54,162,235)',
        'rgb(129,161,242)',
        'rgb(0,161,172)'
      ]
    }]
  };

  public data3 = {
    labels: [
      'id.libero.Donec@mauris.edu',
      'ridiculus.mus@ipsum.com',
      'sit.amet@Nullam.co.uk',
      'aliquet.diam@semmollis.net'
    ],
    datasets: [{
      label: 'Total Costs For A User In a Run of The Simulator. Biggest Users of Network',
      data: [1, 1, 1, 1],
      fill: true,
      backgroundColor: 'rgb(63,63,191)',
      borderColor: 'rgb(63,63,191)',
      pointBackgroundColor: 'rgb(63,63,191)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(63,63,191)'
    }]
  };
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







