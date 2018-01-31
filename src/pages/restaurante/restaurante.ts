import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ModalServiciosPage } from '../modal-servicios/modal-servicios';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import swal from 'sweetalert2';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  coords: any = { lat: 0, lng: 0 };
  restaurant: any = {};
  address: string;
  esFavorito = "black";
  valoracion = this.navParams.get('valoracion');
  comentarios: any;
  cantidadComentarios;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private launchNavigator: LaunchNavigator,
    public dbFirebase: FirebaseDbProvider,
  ) {
    this.restaurant = this.navParams.data;
  }

  /**
   * @function openModal abre el modal 
   * donde se encuentran todos los servicios
   * que puede tener un restaurante
   * @memberof RestaurantePage
   */
  openModal() {
    let modal = this.modalCtrl.create(ModalServiciosPage);
    modal.present();
  }

  /**
   * @function mostarMensaje muestra algun mensaje al 
   * usuario 
   * @param {any} mensaje es a información que se desea
   * mostrar
   * @memberof RestaurantePage
   */
  mostrarMensaje(mensaje, tipo) {
    swal({
      position: 'top-end',
      type: tipo,
      title: mensaje,
      showConfirmButton: false,
      timer: 2500
    })
  }

  /**
   * @function cerrarModal cierra el modal donde
   * se encuentran todos los servicios
   * @memberof RestaurantePage
   */
  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  /**
   * 
   * @function comoLlegar obtiene tu distancia, la distancia destino y 
   * llama al método lauchNavigator quien es el encargado de 
   * trazar la ruta  
   * @memberof RestaurantePage
   */
  comoLlegar() {
    let destino = this.restaurant.lat + ', ' + this.restaurant.lng;
    this.launchNavigator.navigate(destino)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );
  }

  /**
   * 
   * @function addFavorito Agrega un restaurante a favoritos
   * @param {any} restaurant 
   * @memberof RestaurantePage
   */
  addFavorito() {
    let restaurante = {
      id: this.navParams.get('id'),
      favoritos: this.navParams.get('favoritos'),
      nombre: this.navParams.get('nombre'),
      lema: this.navParams.get('lema'),
      descripcion: this.navParams.get('descripcion'),
      image: this.navParams.get('image'),
      lat: this.navParams.get('lat'),
      lng: this.navParams.get('lng'),
    }
    if (this.esFavorito == "black") {
      this.dbFirebase.agregarFavorito(restaurante)
        .then((res) => {
          //si se guarda perfectamente entonces mostramos el mensaje
          this.mostrarMensaje("Restaurante agregado a favorito", "success");
        })
        .catch((err) => {
          console.log(`no se guardo ${err}`);
        })
    } else {
      this.dbFirebase.removerFavorito(restaurante)
        .then((res) => {
          this.mostrarMensaje('Restaurant Eliminado de Favorito', "success");
          this.esFavorito = "black"
        })
        .catch((err) => {
          console.log(`no se guardo ${err}`);
        })
    }
  }


  /**
   * @function addFavorito Agrega un restaurante a favoritos
   * @param {any} restaurant 
   * @memberof RestaurantePage
   */
  addValoracion() {
    let restaurante = {
      id: this.navParams.get('id'),
      nombre: this.navParams.get('nombre'),
      valoracion: this.navParams.get('valoracion'),
    }
    this.dbFirebase.agregarValoracion(restaurante) // agregamos la vaaloración para que un usuario no pueda valorar varias veces un mismo menú
      .then((res) => {
        //si se guarda perfectamente entonces mostramos el mensaje
        swal({
          position: 'top-end',
          type: 'success',
          title: '¡Gracias!, aumentaste la valoración de nuestro restaurante',
          showConfirmButton: false,
          timer: 2500
        })
        //ademas modificamos las valoraciones de ese restaurante
        this.dbFirebase.actualizarValoracion(restaurante)
          .then((res) => this.valoracion = res)
      })
      .catch((err) => {
        console.log(`no se guardo ${err}`);
      })
  }

  /**
   * 
   * @function getAddress Obtiene la dirección , es decir la
   * longitud y la latitud para pasarla al geocode quien es 
   * el encargado de transformar las coordandas a direccion
   * @param {any} coords 
   * @returns {*} 
   * @memberof ModalNuevoSitioPage
   */
  getAddress(coords): any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function (resolve, reject) {
      geocoder.geocode({ 'location': coords }, function (results, status) { // llamado asincronamente
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  /**
   * @function esRestaurantFavorito verifica si un restaurante
   * pertene a favoritos, en caso de que sea favorito cambia el 
   * color del simbolo 
   * @param {any} restaurantID es el id del restaurante que 
   * se desea comparar 
   * @memberof RestaurantePage
   */
  esRestaurantFavorito(restaurantID) {
    this.dbFirebase.getRestaurantFavoritos().subscribe(restaurantes => {
      for (let i = 0; i < restaurantes.length; i++) {
        if (restaurantes[i]['id'] === restaurantID) {
          this.esFavorito = "danger";
        }
      }
    });
  }

  /**
   * @function fechaActual retorna la fecha actual
   * @returns fecha 
   * @memberof RestaurantePage
   */
  fechaActual() {
    let dt = new Date(); //fecha de hoy
    let mes = dt.getMonth() + 1; //mes
    let dia = dt.getDate(); //dia
    let ano = dt.getFullYear(); //año
    let fecha = dia + '-' + mes + '-' + ano;
    return fecha;
  }
  /**
   * @function puedeComentar() verifica si un 
   * usuario puede realizar 1 comentario, puesto que
   * 1 usuario puede realizar 1 comentario por día.
   * Para ello realiza una llamada al método puedeComenter()
   * para que realice una consulte en FireBase medante el
   * método getComentarios(this.restaurant) que recibe
   * el restaurante al cual el usuario que realizar el 
   * comentario. El método puedeComentar() puede 
   * retornar falso o verdadero
   * @memberof RestaurantePage
   */
  puedeComentar() {
    let valor;
    console.log("aquiii" + this.comentarios.length);
    if (this.comentarios.length == 0) {
      valor = true
    } else {
      for (let i = 0; i < this.comentarios.length; i++) {
        if ((this.comentarios[i]['fecha'] === this.fechaActual()) && (this.comentarios[i]['usuario'] === this.dbFirebase.auth.getUser())) {
          valor = false;
          break;
        } else {
          valor = true;
        }
      }
    }
    if (valor) { return true } else { return false }
  }

  /**
   * @function ingresarComentario() Primeramente mendiante la 
   * condición "if (this.puedeComentar())" se realiza una llamada
   * a la funcion PuedeComentar() donde se verifica si el usuario realmente
   * puede realizar un comentario ya que 1 persona puede realizar
   * 1 comentario por día y por restaurante. En caso de que la respuesta
   * sea positiva entonces muestra un mensaje vusando swal.setDefaults({}) 
   * donde solicita al usuario que ingrese el comentario y subsiguientemente
   * el mensaje es guardado en FireBase.Por ultimo y no menos importante, 
   * en caso de que el usuario no pueda comentar entonces se mostrará
   * un meensaje notificandolo
   * @memberof RestaurantePage
   */
  ingresarComentario() {
    console.log(`acá está llegando ${this.puedeComentar()}`);
    if (this.puedeComentar()) {
      swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Siguiente &rarr;',
        showCancelButton: true,
        progressSteps: ['1']
      })
      var steps = [
        {
          title: '¡Comenta!',
          text: '¿Que tal te pareció nuestro Menú?'
        }
      ]
      swal.queue(steps).then((result) => {
        swal.resetDefaults()
        if (result.value != "" && result.value != null) {
          swal({
            title: '¡Listo!',
            html:
              'Tu comentario es: <pre>' +
              JSON.stringify(result.value) +
              '</pre>',
            confirmButtonText: 'Publicar'
          })

          let comentario = {
            id: Date.now(),
            descripcion: result.value[0],
            fecha: this.fechaActual(),
            restaurante: this.restaurant.id,
            usuario: this.dbFirebase.auth.getUser()
          }
          this.dbFirebase.pubicarComentario(comentario, this.restaurant);
        }
      })
    } else {
      this.mostrarMensaje("Lamentablemente solo puedes comentar 1 vez al día por restaurante", "error");
    }
  }
  /**
   * @function getComentarios llama a la funcion getComentarios(restaurant)
   * en fireBase para recibir  el listado de comentarios 
   * @param {any} restaurant es el restaurante de quien se quiere conocer
   * sus comentarios
   * @memberof RestaurantePage
   */
  getComentarios(restaurant) {
    this.dbFirebase.getComentarios(restaurant).subscribe(comentarios => {
      this.comentarios = comentarios;
      this.cantidadComentarios = comentarios.length; //agrega la cantidad de comentarios
    });
  }

  ionViewDidLoad() {
    this.getComentarios(this.restaurant) //función que carga los comentarios cuando se agregan
    this.esRestaurantFavorito(this.restaurant.id); //función que vambia a favorito cuando se agrega
    this.coords.lat = this.navParams.get("lat"); //obtiene la lat pasada por parametro
    this.coords.lng = this.navParams.get("lng"); //obtiene la lng pasada por parametro
    this.getAddress(this.coords).then(
      results => {
        this.address = results[0]["formatted_address"];
      },
      errStatus => {
        console.log(`hubo un error ${errStatus}`);
      }
    );
  }
}
