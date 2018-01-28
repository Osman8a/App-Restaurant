import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Platform
} from "ionic-angular"; //AlertController para mostrar los mensajes de error
import { AuthProvider } from "../../providers/auth/auth"; // nustro proveedor
import { GooglePlus } from "@ionic-native/google-plus";
import swal from "sweetalert2"; // alertas
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";



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
    private af: AngularFireAuth,
    private platform: Platform
  ) { }

  facebookLogin() {
    // this.facebook.login(['email', 'public_profile']).then((res) => {
    //   const facebookCreds = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    //   firebase.auth().signInWithCredential(facebookCreds).then((res) => {
    //     let currentuser = firebase.auth().currentUser;
    //     window.localStorage.setItem('currentuser', JSON.stringify(currentuser.displayName));
    //     alert(currentuser.displayName);
    //     this.navCtrl.pop();
    //   }, (err) => {
    //     alert('Login not successful' + err);
    //   })
    // })
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
          this.navCtrl.push('MisTabsPage');
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
        var errorCode = err.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            swal(
              "No te encuentras en nuestra Base de Datos",
              "Registrate e ingresa nuevamente para que disfrutes de Menú para Hoy",
              "error"
            );
            break;
          default:
            let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: err.message,
              buttons: ["Aceptar"]
            });
            alert.present();
            break;
        }
      });
  }
}
