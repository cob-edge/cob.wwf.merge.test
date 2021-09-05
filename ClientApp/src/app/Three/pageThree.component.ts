import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Three',
  templateUrl: './pageThree.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Three {
  public iots: IoT[];

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

