import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisTabsPage } from './mis-tabs';

@NgModule({
  declarations: [
    MisTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MisTabsPage),
  ],
  exports: [
    MisTabsPage
  ]
})
export class MisTabsPageModule { }
