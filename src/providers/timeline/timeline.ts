import { Injectable } from "@angular/core";
import { Component } from "@angular/core";
import { NavController, ModalController, LoadingController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth"; // importo
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { ImageViewerController } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from "@ionic-native/geolocation";
import swal from 'sweetalert2';
import { Alertas } from "../../config/config";

/*
  Generated class for the TimelineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimelineProvider {

  _imageViewerCtrl: ImageViewerController;
  sitios: any;
  imagen: any;
  nombre: any;
  coords: any = { lat: 0, lng: 0 };
  distancias = [];
  valoracion = 0;
  alert = new Alertas();

  constructor(public navCtrl: NavController,
    public auth: AuthProvider, // inyecto auth
    public dbFirebase: FirebaseDbProvider,
    public imageViewerCtrl: ImageViewerController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
  }


  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////----------NAVEGAVILIDAD Y OPCIONES DE MODALES----------/////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @function cerrarSesion llama a la funcion de
   * cerrar sesion
   * @memberof HomePage
   */
  cerrarSesion() {
    this.auth.logout();
  }
  /**
   * 
   * @function verInfoRestaurante() llama a un modal donde
   * se mostrará la información del restaurante
   * @param {any} restaurant recibe el restaurant que se
   * quiere visualizar
   * @memberof HomePage
   */
  verInfoRestaurante(restaurant) {
    let modalSitio = this.modalCtrl.create('RestaurantePage', restaurant);
    modalSitio.present();
  }


  /**
  * @function presentImage() permite agrandar la
  * imgen del menú
  * @param {any} myImage es la imagen que se desea
  * agrandar
  * @memberof HomePage
  */
  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();

    setTimeout(() => imageViewer.dismiss(), 3000);
    imageViewer.onDidDismiss(() => console.log("imagen agrandada"));
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////--------------     GEOLOCALIZACIÓN   ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  /**
   * @function miUbicacion() llamada a una ventana 
   * modal que muestra e mapa con tu ubicación actual
   * @memberof HomePage
   */
  miUbicacion() {
    this.navCtrl.push("MiUbicacionPage")
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
    this.geolocation.getCurrentPosition()
      .then(res => {
        this.coords.lat = res.coords.latitude;
        this.coords.lng = res.coords.longitude;
        // for (let i = 0; i < this.sitios.length; i++) {
        //   if (parseInt(this.getKilometros(lat, lng, this.sitios[i]['lat'], this.sitios[i]['lng']))) {
        //     B.push(A[i]);
        //   }
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////--------------     VALORAR MENÚS     ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  getKilometros(lat1, long1, lat2, long2) {
    var rad = (x) => x * Math.PI / 180;
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(long2 - long1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3);
  }

  /**
   * 
   * @function ValorarMenu(), este método permite valorar
   * un menú, primeramente usa la librería SwitAlert2 (swal)
   * quien se encarga de mostrar los respectimos mensajes 
   * animandos, una vez selccionada la opción, entonces en el 
   * apartado inputValidator() se llamada a la función que te 
   * va a permitir valorar un menú solo si estás adentro de 
   * las instalaciones
   * @memberof HomePage
   */
  valorarMenu(restaurant) {
    let restaurante = {
      lat: restaurant.lat,
      lng: restaurant.lng,
      id: restaurant.id,
      nombre: restaurant.nombre,
      valorMenu: restaurant.pizarras.valoracionmenu
    }
    this.alert.mostrarAlertaConTimpo('Verificando tu posición', 1000)
      .then(() => {
        if (parseInt(this.getKilometros(this.coords.lat, this.coords.lng, restaurante.lat, restaurante.lng)) <= 0.5) {
          swal({
            title: 'Asigna tu valoración',
            imageUrl: 'https://goo.gl/4ECWQE',
            imageWidth: 400,
            imageHeight: 220,
            input: 'radio',
            animation: true,
            inputOptions: {
              '1': '1',
              '2': '2',
              '3': '3',
              '4': '4',
              '5': '5',
            },
            inputValidator: (opcion) => {
              if (opcion != null) {
                restaurante.valorMenu = restaurante.valorMenu + parseInt(opcion);
                this.dbFirebase.actualizarValoracion(restaurante).then(() => {
                  this.alert.mostrarAlertaSimpleconTiempo('success', '¡Gracias!, aumentaste la valoración de nuestro menú', 2700)
                })
              }
              return !opcion && 'Necesitas seleccionar una opción!'
            }
          })
        } else {
          this.alert.mostrarAlertaSimple('¡Hey!', 'Lamentablemente no te encuentras en nuestro Restaurante', 'warning');
        }
      })
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////-------------- METODOS PARA COMPARTIR----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  /**
    * @function whatsapShare() permite compartir vía whatsapp
    * @param {any} nombre es el nombre del restaurante
    * @param {any} foto es la imagen que se desea compartir
    * @memberof HomePage
   */
  whatsapShare(nombre, foto) {
    this.socialSharing.shareViaWhatsApp(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`, null/* url */)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }
  /**
   * @function twitterShare() permite compartir vía twitter
   * @param {any} nombre es el nombre del restaurante
   * @param {any} foto es la imagen que se desea compartir
   * @memberof HomePage
   */
  twitterShare(nombre, foto) {
    this.socialSharing.shareViaTwitter(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`, null/* url */)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }
  /**
  * @function facebookShare() permite compartir vía facebook
  * @param {any} nombre es el nombre del restaurante
  * @param {any} foto es la imagen que se desea compartir
  * @memberof HomePage
   */
  facebookShare(nombre, foto) {
    this.socialSharing.shareViaFacebook(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`, null/* url */)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }
  /**
   * @function emailShare() permite compartir vía correo
   * @param {any} nombre es el nombre del restaurante
   * @param {any} foto es la imagen que se desea compartir
   * @memberof HomePage
   */
  emailShare(nombre, foto) {
    this.socialSharing.shareViaEmail(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día`, `Menú para Hoy`, null /*iría el correo*/, null, null, `${foto}`)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }
  /**
   * 
   * @function instagramShare permite compartir vía instagram
   * @param {any} nombre es el nombre del restaurante
   * @param {any} foto es la imagen que se desea compartir
   * @memberof HomePage
   */
  instagramShare(nombre, foto) {
    this.socialSharing.shareViaInstagram(`¡Hola!, te recomiendo el restaurant "${nombre}", este es su menú del día `, `${foto}`)
      .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////-------------- CARGA DE COMPONENTES ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  /**
   * metodo que inicia en el momento que inicia por
   * primera vez la aplicación
   * @memberof HomePage
   */
  ionViewDidEnter() {
    this.dbFirebase.getSitios().subscribe(sitios => {
      this.sitios = sitios;
    });
  }

  ionViewDidLoad() {
    this.obtenerPosicion();
  }


}
