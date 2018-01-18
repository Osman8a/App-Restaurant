import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-servicios',
  templateUrl: 'modal-servicios.html',
})
export class ModalServiciosPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalServiciosPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
