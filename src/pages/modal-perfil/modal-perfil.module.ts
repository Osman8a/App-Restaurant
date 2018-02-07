import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPerfilPage } from './modal-perfil';

@NgModule({
  declarations: [
    ModalPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPerfilPage),
  ],
})
export class ModalPerfilPageModule {}
