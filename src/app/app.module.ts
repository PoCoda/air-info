import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextInfoComponent } from './components/text-info/text-info.component';
import { HelloComponent } from './components/hello/hello.component';
import { MetricComponent } from './components/metric/metric.component';
import { CurrentStatusComponent } from './components/current-status/current-status.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FooterComponent } from './components/footer/footer.component';
import { RequestCache } from './services/request-cache.service';
import { CachingInterceptor } from './services/caching-interceptor.service';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { ReactiveFormsModule } from '@angular/forms';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    TextInfoComponent,
    HelloComponent,
    MetricComponent,
    CurrentStatusComponent,
    FooterComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    RequestCache,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

