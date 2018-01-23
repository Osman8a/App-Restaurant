import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ModalServiciosPage } from '../modal-servicios/modal-servicios';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";

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


  openModal() {
    let modal = this.modalCtrl.create(ModalServiciosPage);
    modal.present();
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  comoLlegar() {
    let destino = this.restaurant.lat + ', ' + this.restaurant.lng;
    this.launchNavigator.navigate(destino)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );

  }

  addFavorito(restaurant) {
    // console.log(`entro ${JSON.stringify(restaurant)}`);
    let restaurante = {
      nombre: this.navParams.get('nombre'),
      lema: this.navParams.get('lema'),
      descripcion: this.navParams.get('descripcion'),
      image: this.navParams.get('image'),
      lat: this.navParams.get('lat'),
      lng: this.navParams.get('lng'),
    }
    this.dbFirebase.agregarFavorito(restaurante)
      .then((res) => {
        console.log(`Restaurant agregado a fovorito satisfactoriamente ${res}`);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantePage');
    this.coords.lat = this.navParams.get("lat"); //obtiene la lat pasada por parametro
    this.coords.lng = this.navParams.get("lng"); //obtiene la lng pasada por parametro
    this.getAddress(this.coords).then(
      results => {
        this.address = results[0]["formatted_address"];
        console.log(`la direccion es ${this.address}`);
      },
      errStatus => {
        //manejar el error
        console.log(`hubo un error ${errStatus}`);
      }
    );
  }
}
