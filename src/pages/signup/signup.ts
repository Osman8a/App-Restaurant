import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { AuthProvider } from "../../providers/auth/auth"; // nustro proveedor
import { GooglePlus } from "@ionic-native/google-plus";

import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import swal from "sweetalert2";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  user = { secondemail: "", email: "", password: "", nombre: "" };
  fireauth = firebase.auth();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public googlePlus: GooglePlus,
    private af: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }

  /**
   * @function validarFomulario() se encarga de
   * validar el formulario Singup
   * @returns
   * @memberof SignupPage
   */
  validarFomulario() {
    var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const user = {
      email: this.user.email,
      secondemail: this.user.secondemail,
      password: this.user.password
    };

    if (
      user.email === user.secondemail &&
      user.email != "" &&
      user.secondemail != ""
    ) {
      return 0;
    }
    if (user.email == "" || user.password == "" || user.secondemail == "") {
      return 1;
    }
    if (user.email != user.secondemail) {
      return 2;
    }
    if (emailRegex.test(user.email)) {
      return 3;
    }
  }

  /**
   *
   * @function signin()  llama al método registerUser que se ha
   * creado anteriormente en el provider authProvider pasándole como parametros el
   * email y la contraseña que las tenemos en this.user.email y this.user.password
   * respectivamente.
   * @memberof LoginPage
   */
  signup() {
    switch (this.validarFomulario()) {
      case 0:
        this.auth
          .registerUser(this.user.email, this.user.password)
          .then(() => {
            swal(
              "Felicidades",
              "Varifica tu correo para formar parte de la familia Menú para hoy!",
              "success"
            );
          })
          .catch(err => {
            let alert = this.alertCtrl.create({
              title: "Error aquii",
              subTitle: err.message,
              buttons: ["Aceptar"]
            });
            alert.present(); // si se produce un error lo muestra
          });
        break;
      case 1:
        swal(
          "Existen elementos en el formulario que están vacios",
          "Intentalo Nuevamente!",
          "error"
        );
        break;
      case 2:
        swal("Ambos correos no coincide", "Intentalo Nuevamente!", "error");
        break;
      case 3:
        swal(
          "Acabas de ingresar un correo no valido",
          "Intentalo Nuevamente!",
          "error"
        );
        break;
    }
  }
  /**
   *
   * @function googleAuth Login mediante Google
   * @memberof SignupPage
   */
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
}
