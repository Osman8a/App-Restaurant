import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AuthProvider } from "../auth/auth";
/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {
  constructor(public afDB: AngularFireDatabase, public auth: AuthProvider) {
    console.log("Hello FirebaseDbProvider Provider");
  }

  getSitios() {
    return this.afDB.list("sitios").valueChanges();
  }
}
