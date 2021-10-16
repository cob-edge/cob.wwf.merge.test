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
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.http = http;
      this.baseUrl = baseUrl;
  }

  //api updates from database 
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

    this.getUserData()

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
          text: 'Cost Over Time For Normal Melbourne CBD Carpark'
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
          text: 'Sleep Time Over Time (How Long You Could be in Traffic For)',
        },
        scales: {

        }
      },
      data: {
        labels: ['Dailey', 'Weekly', 'Monthly', 'Yearly'],
        datasets: [
          {
            type: 'line',
            label: 'Pause Time (hours)',
            data: [1, 1, 1, 1],
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
      type: 'line',
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
            type: 'line',
            label: 'Letres of Petrol',
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
    this.getChartDataChart1()
    this.chart.update();

    this.chart2.data.datasets[0].data = [10.7, 75, 525, 6300]; // real data from cbd carpark
    this.chart2.update();

    this.getChartDataChart4()
    this.chart4.update();

    this.getChartDataChart3()
    this.chart3.update();
  }

  getChartDataChart1() {
    this.http.get<RecentCostOverTime>(this.baseUrl + 'recentCostOverTime/' + this.User_ID).subscribe(result => {
      this.chart.data.datasets[0].data = result.recent4Aud;
    }, error => console.error(error));
  }

  getChartDataChart4() {
    this.http.get<RecentPetrolOverTime>(this.baseUrl + 'recentPetrolOverTime').subscribe(result => {
      this.chart4.data.datasets[0].data = result.recent4;
    }, error => console.error(error));
  }

  getChartDataChart3() {
    this.http.get<RecentSleepTimeOverTime>(this.baseUrl + 'recentSleepTimeOverTime').subscribe(result => {
      this.chart3.data.datasets[0].data = result.recent4;
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

interface RecentCostOverTime {
  recent4: number[];
  recent4Aud: number[];
}

interface RecentPetrolOverTime {
  recent4: number[];
}

interface RecentSleepTimeOverTime {
  recent4: number[];
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






