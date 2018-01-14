import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth"; // importo

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider // inyecto auth
  ) {}

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
