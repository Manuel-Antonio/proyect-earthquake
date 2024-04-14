import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EarthquakeComponent } from './pages/earthquake/earthquake.component';
import { EarthquakeDetailsComponent } from './pages/earthquake/earthquake-details/earthquake-details.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "earthquake/pages/:id",
    component: EarthquakeComponent
  },
  {
    path: "earthquake/comment/:id",
    component: EarthquakeDetailsComponent
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
