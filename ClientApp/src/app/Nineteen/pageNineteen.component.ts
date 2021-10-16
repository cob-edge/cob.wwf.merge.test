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
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.http = http;
      this.baseUrl = baseUrl;
  }

  //api updates from database V1
  public http: HttpClient;
  public baseUrl: string;

  //run
  ngOnInit() {
    this.createTestChart3();
    this.createTestChart4();
    this.createTestChart2();

    //this.User_ID = -1; // initialisation

    this.getIPAddress();

    //this.getUserData();

    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.updateStats() });
  }

  createTestChart2() {
    //chart creation
    this.chart2 = new Chart('canvas2', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Amount of Passengers Entering the Car Parks Over Time',
        },
        scales: {

        }
      },
      data: {
        labels: ['Dailey', 'Weekly', 'Monthly', 'Yearly'],
        datasets: [
          {
            type: 'line',
            label: 'Amount of passengers',
            data: [1, 1, 1, 1],
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
          text: 'Amount of Vehicles Entering the Car Parks Over Time',
        },
        scales: {

        }
      },
      data: {
        labels: ['Dailey', 'Weekly', 'Monthly', 'Yearly'],
        datasets: [
          {
            type: 'line',
            label: 'Amount of cars',
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

  User_ID: number;
  updateStats() { //this method here does the live data refresh
    this.chart4.data.datasets[0].data = [0, 100, 2000, 0] //real value from the xml and script
    this.chart4.update();

    this.getChartDataChart3();
    this.chart3.update();

    this.getChartDataChart2();
    this.chart2.update();
  }

  getChartDataChart2() {
    this.http.get<RecentPassengerAmountOverTime>(this.baseUrl + 'recentPassengerAmountOverTime').subscribe(result => {
      this.chart2.data.datasets[0].data = result.recent4;
    }, error => console.error(error));
  }

  getChartDataChart3() {
    this.http.get<RecentVehicleAmountOverTime>(this.baseUrl + 'recentVehicleAmountOverTime').subscribe(result => {
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

interface RecentVehicleAmountOverTime {
  recent4: number[];
}

interface RecentPassengerAmountOverTime {
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






