import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth"; // importo
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { ImageViewerController } from 'ionic-img-viewer';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  _imageViewerCtrl: ImageViewerController;
  sitios: any;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider, // inyecto auth
    public dbFirebase: FirebaseDbProvider,
    public imageViewerCtrl: ImageViewerController
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
  }

  ionViewDidLoad() {
    console.log("se ha cargado Home");
  }

  ionViewDidEnter() {
    this.dbFirebase.getSitios().subscribe(sitios => {
      this.sitios = sitios;
      console.log(this.sitios);
    });
  }

  /**
   *
   * @function cerrarSesion llama a la funcion de
   * cerrar sesion
   * @memberof HomePage
   */
  cerrarSesion() {
    this.auth.logout();
  }

  verInfoRestaurante() {
    this.navCtrl.push("RestaurantePage")
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();

    setTimeout(() => imageViewer.dismiss(), 3000);
    imageViewer.onDidDismiss(() => console.log("imagen agrandada"));
  }

  miUbicacion() {
    this.navCtrl.push("MiUbicacionPage")
  }

}
