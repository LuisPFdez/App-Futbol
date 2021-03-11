import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  codigoLiga?: number;
  imagenesEquipos!: Array<String>;
  clavesJugadores!: Array<string>;
  datosJugadores!: Array<Array<any>>;

  constructor(private datos: DataService) {
    this.imagenesEquipos = new Array();
  }

  ngOnInit(): void {

  }

  convertirATabla(datos: Array<any>) {

    var claves: Array<string> = new Array();
    var datosArray: Array<Array<any>> = new Array();
    if (this.datos != undefined && datos.length >= 1) {

      claves = Object.keys(datos[0]);
      datos.forEach(valores => {
        var valoresA = Object.values(valores);
        console.log(valoresA, valores)
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
    this.datos.obtenerEquiposLiga(this.codigoLiga).subscribe((datosLiga)=>{
      var equipos:any = JSON.parse(JSON.stringify(datosLiga)).api.teams;
      console.log(equipos);
      for(var i in equipos){
        let datos = {
          id: equipos[i].team_id,
          nombre: equipos[i].name,
          pais: equipos[i].country
        };
        datosEquipos.push(datos);
        this.imagenesEquipos.push(equipos[i].logo);

      }
      var { claves, datosArray } = this.convertirATabla(datosEquipos);
      this.clavesJugadores = claves;
      this.datosJugadores = datosArray;
    });


  }

}
