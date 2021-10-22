import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-thirteen',
  templateUrl: './pagethirteen.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Thirteen implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;
  componentDestroyed$: Subject<boolean> = new Subject()

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
        legend: {
          labels: {
            fontColor: "white"
          }
        },
        responsive: true,
        title: {
          display: true,
          text: 'Cost Daily For Your Cars',
          fontColor: 'white'
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
        legend: {
          labels: {
            fontColor: "white"
          }
        },
        responsive: true,
        title: {
          display: true,
          text: 'Cost Yearly For Your Cars',
          fontColor: 'white'
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
          }
        ]
      }
    });
  }

  public data1 = {
    labels: [
      'A',
      'B',
      'C',
      'D'
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
      'A',
      'B',
      'C',
      'D'
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

  User_ID: number;
  async updateStats() { //this method here does the live data refresh
    console.log("Hello from update data!");

    this.getChartDataChart1Chart2()
    this.chart.update();
    this.chart2.update();

    this.getChartDataChart3Chart4()
    this.chart4.update();
    this.chart3.update();
  }

  getChartDataChart1Chart2() {
    this.http.get<RecentCostVehicleOverTime>(this.baseUrl + 'recentCostVehicleOverTime/' + this.User_ID).subscribe(result => {
      this.chart.data.labels = result.vehicle_Regs;
      this.chart2.data.labels = result.vehicle_Regs;

      this.chart.data.datasets[0].data = result.vehicle_CostDailyAuds;
      this.chart2.data.datasets[0].data = result.vehicle_CostYearlyAuds;
    }, error => console.error(error));
  }

  getChartDataChart3Chart4() {
    this.http.get<RecentCostVehicle>(this.baseUrl + 'recentCostVehicle/' + this.User_ID).subscribe(result => {

      this.chart4.data.datasets[0].data = result.vehicle_Costs[0];
      this.chart4.data.datasets[1].data = result.vehicle_Costs[1];
      this.chart4.data.datasets[2].data = result.vehicle_Costs[2];
      this.chart4.data.datasets[3].data = result.vehicle_Costs[3];

      this.chart3.data.datasets[0].data = result.vehicle_CostAuds[0];
      this.chart3.data.datasets[1].data = result.vehicle_CostAuds[1];
      this.chart3.data.datasets[2].data = result.vehicle_CostAuds[2];
      this.chart3.data.datasets[3].data = result.vehicle_CostAuds[3];

      this.chart4.data.datasets[0].label = result.vehicle_Regs[0]; //first reg number
      this.chart4.data.datasets[1].label = result.vehicle_Regs[1]; //so on
      this.chart4.data.datasets[2].label = result.vehicle_Regs[2]; 
      this.chart4.data.datasets[3].label = result.vehicle_Regs[3];

      this.chart3.data.datasets[0].label = result.vehicle_Regs[0]; //first reg number/
      this.chart3.data.datasets[1].label = result.vehicle_Regs[1]; //so on
      this.chart3.data.datasets[2].label = result.vehicle_Regs[2];
      this.chart3.data.datasets[3].label = result.vehicle_Regs[3];
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

interface RecentCostVehicleOverTime{
  vehicle_Regs: string[];
  vehicle_CostDailyAuds: number[];
  vehicle_CostYearlyAuds: number[];
}

interface RecentCostVehicle {
  vehicle_Regs: string[];
  vehicle_Costs: number[][];
  vehicle_CostAuds: number[][];
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







