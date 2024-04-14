import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EarthquakeComponent } from './pages/earthquake/earthquake.component';
import { EarthquakeDetailsComponent } from './pages/earthquake/earthquake-details/earthquake-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EarthquakeComponent,
    EarthquakeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
