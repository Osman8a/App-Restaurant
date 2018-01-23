import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../tab-home/home';



@IonicPage()
@Component({
  selector: 'page-mis-tabs',
  templateUrl: 'mis-tabs.html'
})
export class MisTabsPage {

  tabFavoritosRoot = 'TabFavoritosPage'
  tabPorPrecioRoot = 'TabPorPrecioPage'
  tabPorValoracionRoot = 'TabPorValoracionPage'
  tabHome = HomePage


  constructor(public navCtrl: NavController) { }

}
