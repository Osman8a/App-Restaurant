import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AuthProvider } from "../auth/auth";

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {



  constructor(public afDB: AngularFireDatabase, public auth: AuthProvider) {
    console.log("Hello FirebaseDbProvider Provider");
  }

  /**
   * @function getSitios obtiene el listado de 
   * restaurantes
   * @returns 
   * @memberof FirebaseDbProvider
   */
  getSitios() {
    return this.afDB.list("sitios/").valueChanges();
  }

  /**
   * @function getRestaurantFavoritos obtine el 
   * listado de restaaurantes favoritos
   * @returns 
   * @memberof FirebaseDbProvider
   */
  getRestaurantFavoritos() {
    return this.afDB.list("favoritos/" + this.auth.getUser()).valueChanges();
  }


  /**
   * @function agregarFavorito agrega el restautante
   * favorito según el ID del usuario
   * @param {any} restaurant 
   * @returns 
   * @memberof FirebaseDbProvider
   */
  agregarFavorito(restaurant) {
    return this.afDB.database.ref('favoritos/' + this.auth.getUser() + '/' + restaurant.id)
      .set(restaurant)
      .then((res) => console.log(`se guardo`))
      .catch(err => console.log(`hay un error acá ${err}`))
  }

  actualizarFavorito(restaurant) {
    console.log(restaurant.id);
    this.afDB.database.ref('sitios/' + restaurant.id).update({ favoritos: 99 })
  }
}
