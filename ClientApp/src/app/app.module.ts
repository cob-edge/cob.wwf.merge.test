import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
    Ten
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
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
      { path: 'Ten', component: Ten }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
