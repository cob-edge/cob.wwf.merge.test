import { Component } from '@angular/core';
import { Tester } from '../Tester';
import { TestService } from '../test.service';

@Component({
  selector: 'app-Three',
  templateUrl: './pageThree.component.html',
  styleUrls: ['../../assets/css/main.css']
})
export class Three {

  constructor(private _testService: TestService) { }

  testModel = new Tester('', '', '', null);

  onSubmit() {

    console.log(this.testModel);

    this._testService.testing(this.testModel)
      .subscribe(
        data => console.log("Success!", data),
        error => console.error("Error sending data", error)
      )
  }
}
