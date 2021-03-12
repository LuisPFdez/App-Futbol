import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
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

  constructor(private datos: DataService) {
    this.imagenesEquipos = new Array();
    this.cerrarJugadores = true;
  }

  ngOnInit(): void {

  }
  //Tablas necesita recibir dos variables mediante input. 
  //convertir a trabla se encarga de Recibir un Array de objectos y pasarlos a un formato aceptado por el componente tablas
  private convertirATabla(datos: Array<any>) {

    var claves: Array<string> = new Array();
    var datosArray: Array<Array<any>> = new Array();
    if (this.datos != undefined && datos.length >= 1) {

      claves = Object.keys(datos[0]);
      datos.forEach(valores => {
        var valoresA = Object.values(valores);
        datosArray.push(valoresA);
      }
      );
    } else {
      claves = [];
      datosArray = [];
    }
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

  cerrar(){
    this.cerrarJugadores = true;
  }

}
