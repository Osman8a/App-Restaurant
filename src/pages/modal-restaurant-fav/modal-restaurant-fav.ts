import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { TimelineProvider } from "../../providers/timeline/timeline";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";


@IonicPage()
@Component({
  selector: 'page-modal-restaurant-fav',
  templateUrl: 'modal-restaurant-fav.html',
  providers: [TimelineProvider]
})
export class ModalRestaurantFavPage {

  sitios: any;
  nombre: any;
  lema: any;
  descripcion: any;
  image: any;
  lat: any;
  lng: any;
  favoritos: any;
  valoracion: any;
  fotoPizarra: any;
  desdePizarra: any;
  hastaPizarra: any;
  minPizarra: any;
  maxPizarra: any;
  valoracionmenuPizarra: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public timeline: TimelineProvider,
    public dbFirebase: FirebaseDbProvider,
    public modalCtrl: ModalController
  ) {
  }


  miPerfil() {
    let modal = this.modalCtrl.create('ModalPerfilPage');
    modal.present();
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////--------------   MENÚ / TIMELINE     ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  cerrarSesion() {
    //this.auth.logout();
    this.timeline.cerrarSesion();
  }

  verInfoRestaurante(restaurant) {
    this.timeline.verInfoRestaurante(restaurant);
  }

  presentImage(myImage) {
    this.timeline.presentImage(myImage);
  }

  miUbicacion() {
    this.timeline.miUbicacion();
  }

  valorarMenu(restaurant) {
    this.timeline.valorarMenu(restaurant);
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////--------------      COMPARTIR        ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  whatsapShare(nombre, foto) {
    this.timeline.whatsapShare(nombre, foto);
  }

  twitterShare(nombre, foto) {
    this.timeline.twitterShare(nombre, foto)
  }

  facebookShare(nombre, foto) {
    this.timeline.facebookShare(nombre, foto);
  }

  emailShare(nombre, foto) {
    this.timeline.emailShare(nombre, foto);
  }

  instagramShare(nombre, foto) {
    this.timeline.instagramShare(nombre, foto);
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////-------------- CARGA DE COMPONENTES ----------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  /**
   * metodo que inicia en el momento que inicia por
   * primera vez la aplicación
   * @memberof HomePage
   */
  ionViewDidEnter() {
    // let favoritoID = this.navParams.get('id');
    // console.log("en el modal esta" + favoritoID);
    // this.dbFirebase.getSitio(favoritoID)
    //   .then((res) => {
    //     let sitio = {
    //       nombre: JSON.stringify(res.val().nombre)
    //     };
    //     this.sitios = sitio;
    //     console.log(`el restaurante favorito es ${this.sitios.nombre}`);
    //   })
    //   //     .subscribe(sitios => {
    //   //       this.sitios = sitios;
    //   //       console.log("adentro recibió" + this.sitios);
    //   //     });
  }
  // ionViewDidEnter() {
  //   let favoritoID = this.navParams.get('id');
  //   console.log("en el modal esta" + favoritoID);
  //   this.dbFirebase.getSitios('favorito', favoritoID).subscribe(sitios => {
  //     this.sitios = JSON.stringify(sitios);
  //   });
  //}

  // .then((res) => {
  //   let datos = res.val()
  //   this.sitios = JSON.stringify(datos);
  //   //console.log(`el restaurante favorito es ${JSON.stringify(datos)}`);
  // })


  ionViewDidLoad() {
    this.timeline.obtenerPosicion();

    let favoritoID = this.navParams.get('id');
    console.log("en el modal esta" + favoritoID);
    this.dbFirebase.getSitio(favoritoID)
      .then((res) => {
        this.nombre = res.val().nombre
        this.lema = res.val().lema
        this.descripcion = res.val().descripcion
        this.image = res.val().image
        this.lat = res.val().lat
        this.lng = res.val().lng
        this.favoritos = res.val().favoritos
        this.valoracion = res.val().valoracion
        this.fotoPizarra = res.val().pizarras.foto
        this.desdePizarra = res.val().pizarras.desde
        this.hastaPizarra = res.val().pizarras.hasta
        this.minPizarra = res.val().pizarras.min
        this.maxPizarra = res.val().pizarras.max
        this.valoracionmenuPizarra = res.val().pizarras.valoracionmenu

        console.log(`el restaurante favorito es ${this.desdePizarra}`);
      })
  }



}
