import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular"; //AlertController para mostrar los mensajes de error
import { AuthProvider } from "../../providers/auth/auth"; // nustro proveedor
import { GooglePlus } from "@ionic-native/google-plus";
import swal from "sweetalert2"; // alertas

import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import { HomePage } from "../home/home";
import { WelcomePage } from "../welcome/welcome";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = { email: "", password: "" };
  fireauth = firebase.auth();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public googlePlus: GooglePlus,
    private af: AngularFireAuth
  ) {}

  facebookLogin() {
    this.auth.facebookLogin();
  }

  googleAuth() {
    this.googlePlus
      .login({
        //nuevo
        webClientId:
          "767495751556-7ll1eumre2o4robhs9rm8p2v97cq30rb.apps.googleusercontent.com" //
      })
      .then(res => {
        //
        const firecreds = firebase.auth.GoogleAuthProvider.credential(
          res.idToken
        ); //
        this.fireauth
          .signInWithCredential(firecreds) //
          .then(res => {
            //
            alert("Login Saatisfactorio"); //
          }) //
          .catch(err => {
            //
            alert(`La conexión con FireBase falló${err}`); //
          }); //
      })
      .catch(err => {
        alert(`cambio 1 ${err}`);
      });
  }
  /**
   *
   * @function login llama a la funcion loginUser
   * que se encuetra en el authProvider, pasandole
   * el email y la contraseña
   * @memberof LoginPage
   */
  login() {
    this.auth
      .loginUser(this.user.email, this.user.password)
      .then(() => {
        let user: any = this.af.auth.currentUser;
        if (user.emailVerified) {
          this.navCtrl.push(HomePage);
        } else {
          swal(
            "Tu correo no ha sido validado",
            "Verificalo y Disfruta de la variedad de manjares que te ofrece Menú para Hoy",
            "error"
          );
          this.navCtrl.push("LoginPage");
        }
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err.message,
          buttons: ["Aceptar"]
        });
        alert.present();
      });
  }
}
