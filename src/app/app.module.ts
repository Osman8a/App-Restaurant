import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';

import { AuthProvider } from '../providers/auth/auth';


import { AngularFireModule } from 'angularfire2';  // Firebase
import { AngularFireDatabaseModule } from 'angularfire2/database'; // Firebase database
import { AngularFireAuthModule } from 'angularfire2/auth'; // Firebase login
import { Facebook } from '@ionic-native/facebook';//facebook 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { SignaturePadModule } from 'angular2-signaturepad';


//Configuracion para conectarse a FireBase
export const firebaseConfig = {
  apiKey: "AIzaSyBmEItiYbG-xCLiBpBvwOZ5PY4LVPv76TI",
  authDomain: "menu-para-hoy-1514454952723.firebaseapp.com",
  databaseURL: "https://menu-para-hoy-1514454952723.firebaseio.com",
  storageBucket: "menu-para-hoy-1514454952723.appspot.com",
  messagingSenderId: "767495751556"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // inyectamos el modulo de FireBase
    AngularFireDatabaseModule, // inyectamos el modulo de FireBase database
    AngularFireAuthModule // inyectamos el modulo de FireBase login
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    GooglePlus,
    Facebook
  ]
})
export class AppModule { }
