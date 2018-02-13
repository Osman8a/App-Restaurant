import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalRestaurantFavPage } from './modal-restaurant-fav';

@NgModule({
  declarations: [
    ModalRestaurantFavPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalRestaurantFavPage),
  ],
})
export class ModalRestaurantFavPageModule {}
