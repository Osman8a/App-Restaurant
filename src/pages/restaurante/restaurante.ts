import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ModalServiciosPage } from '../modal-servicios/modal-servicios';

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantePage');
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalServiciosPage);
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
