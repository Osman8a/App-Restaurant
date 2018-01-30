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


  // puedeComentar() {
  //   this.afDB.list("comentarios/" + this.auth.getUser()).valueChanges()
  // }

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

  removerFavorito(restaurant) {
    return this.afDB.database.ref('favoritos/' + this.auth.getUser() + '/' + restaurant.id)
      .remove()
      .then((res) => console.log(`se eliminó`))
      .catch(err => console.log(`hay un error acá ${err}`))
  }

  actualizarFavorito(restaurant) {
    console.log(restaurant.id);
    this.afDB.database.ref('sitios/' + restaurant.id).update({ favoritos: 99 })
  }


  agregarValoracion(restaurant) {
    return this.afDB.database.ref('valoracion/' + this.auth.getUser() + '/' + restaurant.id)
      .set(restaurant)
      .then((res) => console.log(`se guardo`))
      .catch(err => console.log(`hay un error acá ${err}`))
  }

  actualizarValoracion(restaurant) {
    let valorActual = restaurant.valoracion + 1;
    return this.afDB.database.ref('sitios/' + restaurant.id).update({ valoracion: valorActual })
      .then(() => Promise.resolve(valorActual))
  }

  /**
   * @function publicarComentario esta funcion se encarga de guardar
   * el comentario que usuario quiere publicar de un menú. Cabe
   * destacar que esta función guarda el mensaje en FireBase
   * @param {any} comentario es el mensaje que se desea publicar
   * @param {any} restaurant es el restaurant al cual se le agregó el comentario
   * @memberof FirebaseDbProvider
   */
  pubicarComentario(comentario, restaurant) {
    return this.afDB.database.ref('comentarios/' + restaurant.id + "/" + comentario.id)
      .set(comentario)
      .then((res) => {
        this.afDB.database.ref('sitios/' + restaurant.id + '/pizarras' + '/comentarios' + "/" + comentario.fecha).set(comentario)
      })
      .catch(err => console.log(`hay un error acá ${err}`))
  }

  /**
   * @function getComentarios obtiene el listado de 
   * comentarios por restaurante
   * @returns 
   * @memberof FirebaseDbProvider
   */
  getComentarios(restaurant) {
    return this.afDB.list("comentarios/" + restaurant.id).valueChanges();
  }
}
