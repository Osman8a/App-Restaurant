import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabFavoritosPage } from './tab-favoritos';

@NgModule({
  declarations: [
    TabFavoritosPage,
  ],
  imports: [
    IonicPageModule.forChild(TabFavoritosPage),
  ],
})
export class TabFavoritosPageModule {}
