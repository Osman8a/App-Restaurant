import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


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
  loginUser(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((user)=>Promise.resolve(user))
      .catch((err)=>Promise.reject(err))
  }

  /**
   * 
   * @function Session devuelve el estado de la sesion
   * @readonly
   * @memberof AuthProvider
   */
  get Session(){
    return this.afAuth.authState;
  }

  /**
   * @function logout permite cerrar session 
   * @memberof AuthProvider
   */
  logout(){
    this.afAuth.auth.signOut()
      .then(()=>{
         //hemos salido
      })
  }

}
