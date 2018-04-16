import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapHomeComponent } from './map-home/map-home.component';
import { MapViewComponent } from './map-view/map-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/ban-do', pathMatch: 'full' },
  { path: 'ban-do', component: MapHomeComponent },
  { path: 'map-view', component: MapViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
