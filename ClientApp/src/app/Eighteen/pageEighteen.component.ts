import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-eighteen',
  templateUrl: './pageEighteen.component.html',
  styleUrls: ['../../assets/css/main.css']
})

export class Eighteen implements OnInit {
  //live data declaration
  private updateSubscription: Subscription;
  componentDestroyed$: Subject<boolean> = new Subject()

  //chart js declaration
  title3 = 'livechart';
  chart3;

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
        }
      },
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
      label: 'Total Cars Currently Parked Across Network As a Percentage',
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
  updateStats() { //this method here does the live data refresh
    console.log("Hello from update data! Page Eighteen");

    this.getChartDataChart3()
    this.chart3.update();
  }

  getChartDataChart3() {
    this.http.get<RecentCarParkFill>(this.baseUrl + 'recentCarParkFill').subscribe(result => {
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

interface RecentCarParkFill {
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






