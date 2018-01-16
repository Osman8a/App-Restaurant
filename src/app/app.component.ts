import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "../providers/auth/auth";

//import { DbProvider } from "../providers/db/db";
import { HomePage } from "../pages/home/home";
import { WelcomePage } from "../pages/welcome/welcome";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = WelcomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AuthProvider
  ) //public db: DbProvider
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.auth.Session.subscribe(session => {
        //if(session.emailVerified===!null)

        if (session && session.emailVerified) {
          this.rootPage = HomePage; //en caso de que inicie session correctament
        } else {
          this.rootPage = WelcomePage; // en caso de que falle  'LoginPage'
        }
      });

      statusBar.styleDefault();
      splashScreen.hide();

      // this.db.openDb().then(() => this.db.createTableSitios());
    });
  }
}
