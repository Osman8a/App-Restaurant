import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SitioPage } from './sitio';

@NgModule({
  declarations: [
    SitioPage,
  ],
  imports: [
    IonicPageModule.forChild(SitioPage),
  ],
})
export class SitioPageModule {}
