import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiUbicacionPage } from './mi-ubicacion';

@NgModule({
  declarations: [
    MiUbicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(MiUbicacionPage),
  ],
})
export class MiUbicacionPageModule {}
