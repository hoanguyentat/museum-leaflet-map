import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MapViewComponent } from './map-view/map-view.component';
import { MapHomeComponent } from './map-home/map-home.component';
import { MapInfoService } from './map-info.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    MapHomeComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    MapInfoService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
