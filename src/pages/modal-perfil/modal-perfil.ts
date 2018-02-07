import { Component } from '@angular/core';
import { TimelineProvider } from "../../providers/timeline/timeline";
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from "firebase";

/**
 * Generated class for the ModalPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-perfil',
  templateUrl: 'modal-perfil.html',
  providers: [TimelineProvider]
})
export class ModalPerfilPage {

  userProfile: any = null;
  nombre = "Osman Ochoa";
  correo = "ochoaosman@gmail.com";
  telefono = "04165842881";
  direccion = "Urabanización Los Proceres Man 42 Casa #2";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public timeline: TimelineProvider) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPerfilPage');
    console.log(this.userProfile);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cerrarSesion() {
    this.timeline.cerrarSesion();
    this.dismiss()
  }

}
