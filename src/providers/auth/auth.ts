import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//Registro dde usuario



@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
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
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        //el usuario se ha creado correctamente
      }).catch((err) => {
        Promise.reject(err)
      })
  }

}
