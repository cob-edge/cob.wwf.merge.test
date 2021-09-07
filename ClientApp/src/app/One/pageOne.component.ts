import { Component, OnInit, Inject } from '@angular/core';
/import { Chart } from 'chart.js';/
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-one',
  templateUrl: './pageOne.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class One implements OnInit {

  title = 'livechart';
  chart;

  ngOnInit(): void {

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
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August'],
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

    this.chart.data.datasets[0].data = this.info;
    this.chart.update();
  }

  public iots: IoT[];
  public info = [10, 3, 6, 11, 38, 5, 6, 17]

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IoT[]>(baseUrl + 'iot').subscribe(result => {
      this.iots = result;
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
