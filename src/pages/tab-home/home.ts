/////////////////////////////////////////////////////////////////////////////////////////
// ¡Hola!, te puedes fijar que este controlador no se encuentra documentado, pero existe
// una razón, la razón es porque cada método se comunica con el Proveedor timeline y allí  
// se encuentra debidamente documentado cada método. De la misma manera ocurre con 
// TabPorPrecioPage, TabPorValoracionPage y TabFavoritosPage. ¡Éxitos!
/////////////////////////////////////////////////////////////////////////////////////////
import { Component } from "@angular/core";
import { TimelineProvider } from "../../providers/timeline/timeline";
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [TimelineProvider]
})
export class HomePage {
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
    this.dbFirebase.getSitios('home', null).subscribe(sitios => {
      this.sitios = sitios;
    });
  }

  ionViewDidLoad() {
    this.timeline.obtenerPosicion();
  }

}
