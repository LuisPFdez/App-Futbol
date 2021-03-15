import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { ToastrService } from "ngx-toastr"
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  codigoLiga?: number;
  imagenesEquipos!: Array<string>;
  clavesEquipos!: Array<string>;
  datosEquipos!: Array<Array<any>>;
  clavesJugadores!: Array<string>;
  datosJugadores!: Array<Array<any>>;
  cerrarJugadores : boolean;
  usuario!:string;
  constructor(private datos: DataService, private toastr :ToastrService) {
    this.imagenesEquipos = new Array();
    this.cerrarJugadores = true;
  }

  ngOnInit(): void {

  }
  //El componenete principal implementa el componente tablas, este necesita como inputs dos Arrays. 
  //Como los datos recibidos de la api son objetos es necesario pasar el objecto a dos Arrays distintos
  //Recibe un array de objetos como parametro
  private convertirATabla(datos: Array<any>) {
    //El array claves compuesto por strings, almacenara las claves del objeto
    var claves: Array<string> = new Array();
    //El array datosArray, corresponde a los valores el objeto, esta compuesto por Arrays, que corresponden a las filas 
    //y este esta compuesto por cualquier valor, normalmente strings o , valores o columnas de la tabla
    var datosArray: Array<Array<any>> = new Array();
    //comprueba que datos no sea ni undefined ni tenga una longitud menor a 1
    if (this.datos != undefined && datos.length >= 1) {
      //Obtiene los datos de primer valor, que siempre ha de existir, puesto que se da por echo que todos los objetos estan
      //compuestos por las mismas claves
      claves = Object.keys(datos[0]);
      //Recorre el array de datos y extrae las claves del objeto en un array, para añadirlo a datosArray
      datos.forEach(valores => {
        var valoresA = Object.values(valores);
        datosArray.push(valoresA);
      }
      );
    } else {
      //En caso de ser indefinido o datos no tenga una longitud mínima de 1 inicializa datosArray y claves como arrays vacios
      claves = [];
      datosArray = [];
    }
    //Al final devuelve claves y datosArrays
    return { claves, datosArray };
  }

  busqueda(evento: number): void {
    this.codigoLiga = evento;
    var datosEquipos: Array<any> = new Array();
    this.datos.obtenerEquiposLiga(this.codigoLiga).subscribe((datosLiga) => {
      var equipos: any = JSON.parse(JSON.stringify(datosLiga)).api.teams;
      for (var i in equipos) {
        let datos = {
          id: equipos[i].team_id,
          nombre: equipos[i].name,
          pais: equipos[i].country
        };
        datosEquipos.push(datos);
        this.imagenesEquipos.push(equipos[i].logo);

      }
      var { claves, datosArray } = this.convertirATabla(datosEquipos);
      this.clavesEquipos = claves;
      this.datosEquipos = datosArray;
    });



  }
  equipoSelecionado(datos: any) {
    this.cerrarJugadores = false;
    var datosJugadores:Array<any> = new Array();
    this.datos.obtenerJugadores(datos.id).subscribe((datosEquipo) => {
      var jugadores: any = JSON.parse(JSON.stringify(datosEquipo)).api.players;
      for (var i in jugadores) {
        let datos = {
          nombre: jugadores[i].player_name,
          primerApellido: jugadores[i].firstname,
          segundoApellido: jugadores[i].lastname,
          posicion: jugadores[i].position,
          pais: jugadores[i].nationality,
          edad: jugadores[i].age
        };
        datosJugadores.push(datos);

      }
      var { claves, datosArray } = this.convertirATabla(datosJugadores);
      this.clavesJugadores = claves;
      this.datosJugadores = datosArray;
    });
  }

  usuarioF(nombre:string){
    this.toastr.success("Bienvenido "+nombre, "Inicio de sesion exitoso")
    this.usuario = nombre;
  }

  cerrar(){
    this.cerrarJugadores = true;
  }

}
