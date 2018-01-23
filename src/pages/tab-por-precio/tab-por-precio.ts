import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";


@IonicPage()
@Component({
  selector: 'page-tab-por-precio',
  templateUrl: 'tab-por-precio.html',
})
export class TabPorPrecioPage {

  structure: any = { lower: 2, upper: 37 };
  sitios: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbFirebase: FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPorPrecioPage');
  }

  ionViewDidEnter() {
    this.dbFirebase.getSitios().subscribe(sitios => {
      this.sitios = sitios;
    });
  }

}
