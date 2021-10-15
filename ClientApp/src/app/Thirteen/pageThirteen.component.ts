import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-thirteen',
  templateUrl: './pagethirteen.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Thirteen implements OnInit {
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
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  //api updates from database V1
  public http: HttpClient;
  public baseUrl: string;

  //run
  async ngOnInit() {
    this.createTestChart();
    this.createTestChart2();
    this.createTestChart3();
    this.createTestChart4();

    await this.getIPAddress();

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
      type: 'radar',
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
          text: '0TI-K06 Use of Petrol At Diffent Weeks',
        },
        scales: {

        }
      },
      data: {
        labels: ['t-3', 't-2', 't-1', 't'],
        datasets: [
          {
            type: 'line',
            label: 'Live pause time (s) detected by sensor id 66',
            data: [1, 1, 1, 1],
            backgroundColor: '#3F3FBF',
            fill: false,
            borderColor: 'blue'
          }
        ]
      }
    });
  }

  User_ID: number;
  updateStats() { //this method here does the live data refresh
    //console.log("hello from update status chart : " + this.recentV1s[0].recent10);
    this.chart.data.datasets[0].data = [5, 1, 4, 8];
    this.chart.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart2.data.datasets[0].data = [35, 7, 20, 40];
    this.chart2.update();

    this.chart4.data.datasets[0].data = [10, 23, 22, 21]
    this.chart4.update();

    //console.log("hello from update status chart2 : " + this.recentV2s[0].recent10);
    this.chart3.data.datasets[0].data = [35, 7, 20, 40]
    this.chart3.update();
  }

  public data1 = {
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
      '6SR-D14',
      '5NQ-D93',
      '7MQ-F06',
      '0TI-K06'
    ],
    datasets: [{
      label: 'Total Costs Across Vehicles Weekly',
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

interface RecentCostOverTime {
  recent4: number[];
  recent4Aud: number[];
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







