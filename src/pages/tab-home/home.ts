import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth"; // importo
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { ImageViewerController } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  _imageViewerCtrl: ImageViewerController;
  sitios: any;
  imagen: any;
  nombre: any;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider, // inyecto auth
    public dbFirebase: FirebaseDbProvider,
    public imageViewerCtrl: ImageViewerController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
  }


  whatsapShare(nombre, foto) {
    this.socialSharing.shareViaWhatsApp(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`, null/* url */)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }

  twitterShare(nombre, foto) {
    this.socialSharing.shareViaTwitter(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`, null/* url */)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }

  facebookShare(nombre, foto) {
    this.socialSharing.shareViaFacebook(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`, null/* url */)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }

  emailShare(nombre, foto) {
    this.socialSharing.shareViaEmail(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día`, `Menú para Hoy`, null /*iría el correo*/, null, null, `${foto}`)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }

  instagramShare(nombre, foto) {
    this.socialSharing.shareViaInstagram(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }

  ionViewDidLoad() {

  }


  ionViewDidEnter() {
    this.dbFirebase.getSitios().subscribe(sitios => {
      this.sitios = sitios;
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

  verInfoRestaurante(restaurant, i) {
    let modalSitio = this.modalCtrl.create('RestaurantePage', restaurant);
    modalSitio.present();
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
