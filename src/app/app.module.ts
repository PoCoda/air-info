import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextInfosComponent } from './text-info/text-info.component';
import { HelloComponent } from './hello/hello.component';
import { MetricComponent } from './metric/metric.component';
import { MetricsComponent } from './metrics/metrics.component';

@NgModule({
  declarations: [
    AppComponent,
    TextInfosComponent,
    HelloComponent,
    MetricComponent,
    MetricsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
