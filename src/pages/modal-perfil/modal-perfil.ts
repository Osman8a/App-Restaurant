import { Component } from '@angular/core';
import { TimelineProvider } from "../../providers/timeline/timeline";
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { AuthProvider } from "../../providers/auth/auth";
import firebase from "firebase";
import gravatar from 'gravatar';



@IonicPage()
@Component({
  selector: 'page-modal-perfil',
  templateUrl: 'modal-perfil.html',
  providers: [TimelineProvider]
})
export class ModalPerfilPage {

  usuario: any = null;

  nombre: any;
  correo: any;
  telefono: any;
  foto: any;
  esLectura: any;  // Propiedad que permite modificar o no el contenido de el input
  colorButton: any; // color del boton
  textoButton: any; // texto del boton
  usuarioActual: any; //Usuario con la sesion Actual

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public viewCtrl: ViewController,
    public dbFirebase: FirebaseDbProvider,
    public timeline: TimelineProvider) {

    this.esLectura = true // por defecto no se puede modificar el input telefono
    this.colorButton = 'four'; // por defecto el color es rojo
    this.textoButton = "Editar Perfil"; // por defecto el botón tiene ese
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cerrarSesion() {
    this.navCtrl.push('LoginPage')
      .then(() => {
        this.timeline.cerrarSesion();
      })
  }

  cargarDatosPersonales(datos) {
    let user = {
      nombre: this.auth.usuarioActual().displayName,
      correo: this.auth.usuarioActual().email,
      telefono: this.auth.usuarioActual().phoneNumber,
      foto: this.auth.usuarioActual().photoURL
    }

    console.log(this.auth.usuarioActual());
    this.correo = user.correo;
    if (user.foto == null) { //verificar foto
      const fotoGravatar = `http:${gravatar.url(user.correo)}`;
      this.foto = fotoGravatar;
    } else {
      this.foto = user.foto;
    }
    if (user.nombre == null) { //verificar nombre
      this.nombre = user.correo.split('@')[0];
    } else {
      this.nombre = user.nombre;
    }
    if (user.telefono == null) { //verificar telefono
      this.telefono = datos;
    } else {
      this.telefono = user.telefono;
    }
  }


  realiazarFuncion() {
    if (this.colorButton == 'four') {
      // Podemos editar
      this.esLectura = false; // hacemos que el input telefono se pueda cambiar
      this.colorButton = 'primary' // modificamos el color del boton
      this.textoButton = 'Guardar Cambios' // modificamos el texto del boton
      console.log(this.telefono);
    } else {
      // NO podemos editar
      this.esLectura = true; // hacemos que el input telefono se pueda cambiar
      this.colorButton = 'four' // modificamos el color del boton
      this.textoButton = 'Editar Cambios' // modificamos el texto del boton
      let datos = {
        telefono: this.telefono
      }
      this.dbFirebase.nuevosDatos(datos); //si el usuario no existe lo crea
    }
  }


  ionViewWillEnter() {
    this.dbFirebase.getUsuario().then((res) => {
      let datos = res.val().telefono;
      this.cargarDatosPersonales(datos);
      console.log("aqui está" + this.usuarioActual);
    })


  }

}
