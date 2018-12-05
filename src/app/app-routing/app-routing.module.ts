import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapBoxComponent } from '../components/map-box/map-box.component';
const routes: Routes = [
  { path: '', component: MapBoxComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})





export class AppRoutingModule {}
