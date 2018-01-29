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
  restaurant: any;
  address: string;
  esFavorito = "black";

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
    this.dbFirebase.agregarFavorito(restaurante)
      .then((res) => {
        //si se guarda perfectamente entonces mostramos el mensaje
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Restaurant agregado a favorito',
          showConfirmButton: false,
          timer: 2500
        })
        //ademas modificamos los favoritos que tiene ese restaurante
        this.dbFirebase.actualizarFavorito(restaurante)
        // y transformamos el color del corazon
      })
      .catch((err) => {
        console.log(`no se guardo ${err}`);
      })
  }

  ///////////////////////////////////////////
  /**
   * 
   * @function addFavorito Agrega un restaurante a favoritos
   * @param {any} restaurant 
   * @memberof RestaurantePage
   */
  addValoracion() {
    let restaurante = JSON.stringify(this.restaurant);
    console.log("estas acáaaaaaaa" + restaurante.id);
    // this.dbFirebase.agregarValoracion(restaurante)
    //   .then((res) => {
    //     //si se guarda perfectamente entonces mostramos el mensaje
    //     swal({
    //       position: 'top-end',
    //       type: 'success',
    //       title: 'Restaurant agregado a favorito',
    //       showConfirmButton: false,
    //       timer: 2500
    //     })
    //     //ademas modificamos los favoritos que tiene ese restaurante
    //     this.dbFirebase.actualizarValoracion(restaurante)
    //     // y transformamos el color del corazon
    //   })
    //   .catch((err) => {
    //     console.log(`no se guardo ${err}`);
    //   })
  }
  /////////////////////////////////////////

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
      restaurantes.map((item) => {
        if (item.id === restaurantID) {
          this.esFavorito = "danger";
        }
      })
    });

  }

  ionViewDidLoad() {
    this.esRestaurantFavorito(this.restaurant.id);
    this.coords.lat = this.navParams.get("lat"); //obtiene la lat pasada por parametro
    this.coords.lng = this.navParams.get("lng"); //obtiene la lng pasada por parametro
    this.getAddress(this.coords).then(
      results => {
        this.address = results[0]["formatted_address"];
      },
      errStatus => {
        //manejar el error
        console.log(`hubo un error ${errStatus}`);
      }
    );
  }
}
