import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";

/**
 * Generated class for the TabPorValoracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-por-valoracion',
  templateUrl: 'tab-por-valoracion.html',
})
export class TabPorValoracionPage {
  warmth: number = 1300;
  sitios: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbFirebase: FirebaseDbProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPorValoracionPage');
  }

  ionViewDidEnter() {
    this.dbFirebase.getSitios().subscribe(sitios => {
      this.sitios = sitios;
    });
  }
}
