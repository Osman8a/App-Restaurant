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
import { LoginPage } from "../login/login";
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
  user = { secondemail: "", email: "", password: "" };
  fireauth = firebase.auth();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public googlePlus: GooglePlus,
    private af: AngularFireAuth
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  /**
   * @function validarFomulario() se encarga de
   * validar el formulario Singup
   * @returns
   * @memberof SignupPage
   */
  validarFomulario() {
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
    if (this.validarFomulario() === 0) {
      this.auth
        .registerUser(this.user.email, this.user.password)
        .then(() => {
          swal(
            "Felicidades",
            "Varifica tu correo para formar parte de la familia Menú para hoy!",
            "success"
          );
          this.navCtrl.push('LoginPage')
        })
        .catch((err) => {
          var errorCode = err.code;
          switch (errorCode) {
            case 'auth/email-already-in-use':  //Cuando es un correo que ya se encuentra registrado en Base de Datos
              swal(
                "Hey!",
                "Recuerda que ya te encuentras registrado en nuestra App!",
                "error"
              );
              break;
            case 'auth/weak-password': //Cuando es unaa contraseña debil
              swal(
                "Hey",
                "Tu contraseña es muy debil, ingresa una contraseña más segura",
                "error"
              );
              break;
            case 'auth/invalid-email': // cuando es un correo no valido 
              swal(
                "Hey",
                "Tu correo no es un correo válido",
                "error"
              );
              break;
            default:
              //Acá atrapa algun error que no esté previsto
              let alert = this.alertCtrl.create({
                title: "Error aquii",
                subTitle: err.message,
                buttons: ["Aceptar"]
              });
              alert.present(); // si se produce un error lo muestra
              break;
          }
        });
    } else {
      swal(
        "Hey!",
        "Verifica tu correo y además verifica que no se encuentren campos vacios!",
        "error"
      );
    }
  }

}
