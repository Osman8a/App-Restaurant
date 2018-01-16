import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth"; // importo
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  sitios: any;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider, // inyecto auth
    public dbFirebase: FirebaseDbProvider
  ) {}

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
}
