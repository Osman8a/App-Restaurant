import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { Platform } from "ionic-angular"; //evento ready de Platform se lanza cuando la aplicación se ha cargado completamente y esta lista.
//Esto nos evita errores al intentar llamar a un plugin antes de que se haya cargado

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-mi-ubicacion',
  templateUrl: 'mi-ubicacion.html',
})
export class MiUbicacionPage {

  map: any; //admite cualquier valor, variable para manejar el mapa
  coords: any = { lat: 0, lng: 0 };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform, //inyectado como dependencia
    private geolocation: Geolocation
  ) {
    platform.ready().then(() => {
      //la plataforma ya está lista y tenemos acceso a los plugins
      this.obtenerPosicion();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiUbicacionPage');
  }


  /**
   *
   * @func loadMap() carga el mapa, recibe la cordenadas
   * y se configura el tamano del mapa
   * @var miMarker crea un nuevo marcador, icon almancena
   * la imagen del marcador, map el mapa y position las coordenadas
   * @memberof InicioPage
   */
  loadMap() {
    let mapContainer = document.getElementById("map");
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 17
    });

    let miMarker = new google.maps.Marker({
      icon: "assets/images/ico_estoy_aqui.png",
      map: this.map,
      position: this.coords
    });
  }

  /**
   *
   * @func obtenerPosicion() obtiene la
   * longitud y la latitud , las almacena
   * en la variables this.coords.lat y
   * en this.coords.lng, posteriormente
   * llama la funcion loadMap
   * @returns {*}
   * @memberof InicioPage
   */
  obtenerPosicion(): any {
    this.geolocation
      .getCurrentPosition()
      .then(res => {
        this.coords.lat = res.coords.latitude;
        this.coords.lng = res.coords.longitude;

        this.loadMap();
      })
      .catch(err => {
        console.log(err);
      });
  }

}
