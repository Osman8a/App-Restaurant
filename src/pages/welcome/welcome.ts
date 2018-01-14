import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  // tabBarElement: any;
  splash = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //  this.tabBarElement = document.querySelector(".tabbar");
  }

  ionViewDidLoad() {
    // this.tabBarElement.style.display = "none";
    setTimeout(() => {
      this.splash = false;
      //  this.tabBarElement.style.display = "flex";
    }, 4000);
  }

  login() {
    this.navCtrl.push("LoginPage");
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
