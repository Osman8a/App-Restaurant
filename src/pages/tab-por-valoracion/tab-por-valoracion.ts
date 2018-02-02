import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { TimelineProvider } from '../../providers/timeline/timeline';

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
  providers: [TimelineProvider]
})
export class TabPorValoracionPage {
  warmth: number = 1300;
  sitios: any;

  constructor(
    public timeline: TimelineProvider,
    public dbFirebase: FirebaseDbProvider,
  ) { }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////--------------   MENÚ / TIMELINE     ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  cerrarSesion() {
    //this.auth.logout();
    this.timeline.cerrarSesion();
  }

  verInfoRestaurante(restaurant) {
    this.timeline.verInfoRestaurante(restaurant);
  }

  presentImage(myImage) {
    this.timeline.presentImage(myImage);
  }

  miUbicacion() {
    this.timeline.miUbicacion();
  }

  valorarMenu(restaurant) {
    this.timeline.valorarMenu(restaurant);
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////--------------      COMPARTIR        ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  whatsapShare(nombre, foto) {
    this.timeline.whatsapShare(nombre, foto);
  }

  twitterShare(nombre, foto) {
    this.timeline.twitterShare(nombre, foto)
  }

  facebookShare(nombre, foto) {
    this.timeline.facebookShare(nombre, foto);
  }

  emailShare(nombre, foto) {
    this.timeline.emailShare(nombre, foto);
  }

  instagramShare(nombre, foto) {
    this.timeline.instagramShare(nombre, foto);
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////-------------- CARGA DE COMPONENTES ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  /**
   * metodo que inicia en el momento que inicia por
   * primera vez la aplicación
   * @memberof HomePage
   */
  ionViewDidEnter() {
    this.dbFirebase.getSitios().subscribe(sitios => {
      this.sitios = sitios;
    });
  }

  ionViewDidLoad() {
    this.timeline.obtenerPosicion();
  }
}
