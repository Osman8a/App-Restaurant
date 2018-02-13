import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { ModalController } from 'ionic-angular';
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
    public dbFirebase: FirebaseDbProvider,
    public modalCtrl: ModalController
  ) {
  }

  mostrarRestaurantFav(favorito) {
    console.log(favorito.id);
    let restauratFavorito = {
      id: favorito.id
    }
    console.log("EN MOSTRAR ESTÁ" + restauratFavorito.id);
    let modal = this.modalCtrl.create('ModalRestaurantFavPage', restauratFavorito);
    modal.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad TabFavoritosPage');
  }

  ionViewDidEnter() {
    this.dbFirebase.getRestaurantFavoritos().subscribe(favoritos => {
      this.favoritos = favoritos;
      console.log(this.favoritos);
    })
  }

}
