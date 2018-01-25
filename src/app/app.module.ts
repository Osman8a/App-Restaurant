import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { GooglePlus } from "@ionic-native/google-plus";


import { AuthProvider } from "../providers/auth/auth";

import { AngularFireModule } from "angularfire2"; // Firebase
import { AngularFireDatabaseModule } from "angularfire2/database"; // Firebase database
import { AngularFireAuthModule } from "angularfire2/auth"; // Firebase login
import { Facebook } from "@ionic-native/facebook"; //facebook
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';


import { MyApp } from "./app.component";
import { HomePage } from "../pages/tab-home/home";
import { WelcomePage } from "../pages/welcome/welcome";
import { SignupPage } from "../pages/signup/signup";
import { SignaturePadModule } from "angular2-signaturepad";
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { ModalServiciosPage } from "../pages/modal-servicios/modal-servicios";
import { SocialSharing } from '@ionic-native/social-sharing';

//import { SQLite } from "@ionic-native/sqlite";

//Configuracion para conectarse a FireBase
export const firebaseConfig = {
  apiKey: "AIzaSyBmEItiYbG-xCLiBpBvwOZ5PY4LVPv76TI",
  authDomain: "menu-para-hoy-1514454952723.firebaseapp.com",
  databaseURL: "https://menu-para-hoy-1514454952723.firebaseio.com",
  storageBucket: "menu-para-hoy-1514454952723.appspot.com",
  messagingSenderId: "767495751556"
};

@NgModule({
  declarations: [MyApp, HomePage, WelcomePage, SignupPage, ModalServiciosPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // inyectamos el modulo de FireBase
    AngularFireDatabaseModule, // inyectamos el modulo de FireBase database
    AngularFireAuthModule, // inyectamos el modulo de FireBase login
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, WelcomePage, SignupPage, ModalServiciosPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    GooglePlus,
    Facebook,
    FirebaseDbProvider,
    Geolocation,
    LaunchNavigator,
    SocialSharing
  ]
})
export class AppModule { }
