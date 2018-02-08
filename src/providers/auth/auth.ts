import { AngularFireAuth } from "angularfire2/auth";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from '@ionic-native/facebook';
import { Injectable } from "@angular/core";
import * as firebase from "firebase";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//Registro dde usuario

@Injectable()
export class AuthProvider {
  fireauth = firebase.auth();
  constructor(
    private afAuth: AngularFireAuth,
    public googlePlus: GooglePlus,
    public facebook: Facebook
  ) {
    console.log("Hello AuthProvider Provider");
  }

  googleLogin() {
    return this.googlePlus.login({
      'webClientId': "767495751556-7ll1eumre2o4robhs9rm8p2v97cq30rb.apps.googleusercontent.com"
    })
      .then(res => {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        this.afAuth.auth.signInWithCredential(firecreds)
          .then(res => {
            // this.navCtrl.push('MisTabsPage');
            Promise.resolve(res);
            console.log(`Login Satisfactorio`);
          })
          .catch(err => {
            alert(`La conexión con FireBase falló${err}`); //
          });
      })
      .catch(err => Promise.reject(err));
  }

  facebookLogin() {
    return this.facebook.login(['email', 'public_profile'])
      .then(res => {
        const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
        firebase.auth().signInWithCredential(fc)
          .then(fs => {
            Promise.resolve(res);
            console.log(`Login Satisfactorio con Facebook`);
          })
          .catch(err => {
            alert(`falló facebook ${err}`); //
          })
      })
      .catch(err => Promise.reject(err));
  }

  /**
   *
   * @function registerUser crea un uevo usuario con la funcion llamada
   * createUserWithEmailAndPassword
   * @param {string} email
   * @param {string} password
   * @returns
   * @memberof AuthProvider
   */
  registerUser(email: string, password: string) {
    // let user = this.afAuth.auth.currentUser;
    // console.log(user);
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        let user: any = this.afAuth.auth.currentUser;
        console.log(user);
        user
          .sendEmailVerification()
          .then(res => {
            console.log("Verifica tu correo");
          })
          .catch(err => {
            console.log(`Error al enviar el correo ${err}`);
          });
      })
      .catch(err => Promise.reject(err));
  }

  /**
   *
   * @function loginUser permite autenticar al usuario,
   * la autenticacion es realizada mediante el metodo
   * signInWithEmailAndPassword quien es el encargado de
   * autenticarse con Firebase, el then devuelve al usuario
   * correcto, mientras que el catch atrapa el error ocurrido
   * @param {string} email
   * @param {string} password
   * @returns
   * @memberof AuthProvider
   */
  loginUser(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        Promise.resolve(user);
      })
      .catch(err => Promise.reject(err));
  }

  /**
   *
   * @function Session devuelve el estado de la sesion
   * @readonly
   * @memberof AuthProvider
   */
  get Session() {
    return this.afAuth.authState;
  }

  getUser() {
    return this.afAuth.auth.currentUser.uid;
  }

  /**
   * @function logout permite cerrar session
   * @memberof AuthProvider
   */
  logout() {
    this.afAuth.auth.signOut().then(estado => {
      //usurio deslogeado
    });
  }
}
