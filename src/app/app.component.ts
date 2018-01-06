import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth: AuthProvider,
  
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.auth.Session.subscribe((session)=>{
        if(session){
          this.rootPage = HomePage; //en caso de que inicie session correctament
        }
        else{
          this.rootPage= 'LoginPage'; // en caso de que falle
        }
      })
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

