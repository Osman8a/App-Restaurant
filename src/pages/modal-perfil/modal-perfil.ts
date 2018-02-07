import { Component } from '@angular/core';
import { TimelineProvider } from "../../providers/timeline/timeline";
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  nombre = "Osman Ochoa";
  correo = "ochoaosman@gmail.com";
  telefono = "04165842881";
  direccion = "Urabanización Los Proceres Man 42 Casa #2";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public timeline: TimelineProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPerfilPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cerrarSesion() {
    this.timeline.cerrarSesion();
    this.dismiss()
  }

}
