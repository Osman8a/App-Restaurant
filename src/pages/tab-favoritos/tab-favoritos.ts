import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db"
/**
 * Generated class for the TabFavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-favoritos',
  templateUrl: 'tab-favoritos.html',
})
export class TabFavoritosPage {

  favoritos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbFirebase: FirebaseDbProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabFavoritosPage');
  }

  ionViewDidEnter() {
    this.dbFirebase.getRestaurantFavoritos().subscribe(favoritos => {
      this.favoritos = favoritos;
    })
  }

}
