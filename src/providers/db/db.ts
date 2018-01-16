import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {
  db: SQLiteObject = null; //guarda el maanejador de la base de datos
  constructor(
    public sqlite: SQLite //inyectamos la dependenciaa de SQLite
  ) {
    console.log("Hello DbProvider Provider");
  }

  /**
   * @function openDB() crea/abre la base de datos
   * @memberof DbProvider
   */
  public openDb() {
    return this.sqlite
      .create({
        name: "mph.db",
        location: "default" //
      })
      .then((db: SQLiteObject) => {
        this.db = db;
      });
  }

  /**
   * @function createTableSitios() crear una tabla con los campos
   * que vamos a necesitar para guardar nuestros sitios con los
   * campos que necesitamos
   * los campos se encuentran representados por:
   *  A) id de tipo integer que sera la clave primaria
   *  B) un campo lat de tipo float donde guardaremos la latitud de las coordenadas
   *  C) lng de tipo float donde guardaremos la longitud
   *  D) un campo address de tipo text para guardar la dirección
   *  E) un campo llamado description de tipo text donde guardaremos la descripción del sitio
   *  F) campo foto también de tipo text donde guardaremos la foto en formato base 64.
   * @memberof DbProvider
   */
  public createTableSitios() {
    return this.db.executeSql(
      "create table if not exists sitios( id INTEGER PRIMARY KEY AUTOINCREMENT, lat FLOAT, lng FLOAT, address TEXT, description TEXT, foto TEXT )",
      {}
    );
  }

  /**
   * @function addSitio método para Guardar los sitios
   * @param {any} sitio
   * @returns
   * @memberof DbProvider
   */
  public addSitio(sitio) {
    let sql =
      "INSERT INTO sitios (lat, lng, address, description, foto) values (?,?,?,?,?)";
    return this.db.executeSql(sql, [
      sitio.lat,
      sitio.lng,
      sitio.address,
      sitio.description,
      sitio.foto
    ]);
  }
}
