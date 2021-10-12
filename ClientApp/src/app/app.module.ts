import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedService } from './shared.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HelloComponent } from './hello-world/hello.component';
import { One } from './One/pageOne.component';
import { Two } from './Two/pageTwo.component';
import { Three } from './Three/pageThree.component';
import { Four } from './Four/pageFour.component';
import { Five } from './Five/pageFive.component';
import { Six } from './Six/pageSix.component';
import { Seven } from './Seven/pageSeven.component';
import { Nine } from './Nine/pageNine.component';
import { Ten } from './Ten/pageTen.component';
import { Eight } from './Eight/pageEight.component';
import { Eleven } from './Eleven/pageEleven.component';
import { Twelve } from './Twelve/pageTwelve.component';
import { Thirteen } from './Thirteen/pageThirteen.component';
import { Fifteen } from './Fifteen/pageFifteen.component';
import { Sixteen } from './Sixteen/pageSixteen.component';
import { Seventeen } from './Seventeen/pageSeventeen.component';
import { Eighteen } from './Eighteen/pageEighteen.component';
import { Nineteen } from './Nineteen/pageNineteen.component';
import { Twenty } from './Twenty/pageTwenty.component';
import { Twentyone } from './Twentyone/pageTwentyone.component';
import { Twentytwo } from './Twentytwo/pageTwentytwo.component';
import { Twentythree } from './Twentythree/pageTwentythree.component';
import { Review } from './Review/pageReview.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HelloComponent,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Eleven,
    Twelve,
    Thirteen,
    Fifteen,
    Sixteen,
    Seventeen,
    Eighteen,
    Nineteen,
    Twenty,
    Twentyone,
    Twentytwo,
    Twentythree,
    Review
 

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'hello-world', component: HelloComponent },
      { path: 'One', component: One },
      { path: 'Two', component: Two },
      { path: 'Three', component: Three },
      { path: 'Four', component: Four },
      { path: 'Five', component: Five },
      { path: 'Six', component: Six },
      { path: 'Seven', component: Seven },
      { path: 'Eight', component: Eight },
      { path: 'Nine', component: Nine },
      { path: 'Ten', component: Ten },
      { path: 'Eleven', component: Eleven },
      { path: 'Twelve', component: Twelve },
      { path: 'Thirteen', component: Thirteen },
      { path: 'Fifteen', component: Fifteen },
      { path: 'Sixteen', component: Sixteen },
      { path: 'Seventeen', component: Seventeen },
      { path: 'Eighteen', component: Eighteen },
      { path: 'Nineteen', component: Nineteen },
      { path: 'Twenty', component: Twenty },
      { path: 'Twentyone', component: Twentyone },
      { path: 'Twentytwo', component: Twentytwo },
      { path: 'Twentythree', component: Twentythree },
      { path: 'Review', component: Review },
    ])
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
