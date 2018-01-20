import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ModalServiciosPage } from '../modal-servicios/modal-servicios';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  restaurant: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private launchNavigator: LaunchNavigator
  ) {
    this.restaurant = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantePage');
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalServiciosPage);
    modal.present();
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  comoLlegar() {
    let destino = this.restaurant.lat + ', ' + this.restaurant.lng;
    this.launchNavigator.navigate(destino)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );

  }

}
