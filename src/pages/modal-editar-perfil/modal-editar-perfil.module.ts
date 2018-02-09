import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditarPerfilPage } from './modal-editar-perfil';

@NgModule({
  declarations: [
    ModalEditarPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditarPerfilPage),
  ],
})
export class ModalEditarPerfilPageModule {}
