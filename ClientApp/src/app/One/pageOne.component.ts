import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

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
            data: [10, 3, 6, 11, 38, 5, 6, 17],
            backgroundColor: '#3F3FBF',
            fill: false
          }
        ]
      }
    });
  }
}
