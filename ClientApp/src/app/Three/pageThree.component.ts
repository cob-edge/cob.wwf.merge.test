import { Component, Inject } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-Three',
  templateUrl: './pageThree.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Three {

  constructor(private _testService: TestService) { }

  onSubmit() {
    console.log("Form submitted successfully")
  }
}
