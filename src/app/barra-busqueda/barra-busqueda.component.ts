import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
// import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss']
})
export class BarraBusquedaComponent implements OnInit{
  @Output() busqueda: EventEmitter<number>;
  // @ViewChild("barra_busqueda") barra_busqueda!: ElementRef;
  // @ViewChild("liga_select") liga_select!: ElementRef;

  competiciones: { id: number, nombre: string }[] = new Array();

  constructor(private datos: DataService) {
    this.busqueda = new EventEmitter<number>()
  }
  ngOnInit(){
    
    this.datos.obtenerLigas().subscribe((datosLigas) => {
      var ligas:any = JSON.parse(JSON.stringify(datosLigas)).api.leagues
      for(var i in ligas){
        let datos = {
          id: ligas[i].league_id,
          nombre: ligas[i].name
        };
        this.competiciones.push(datos);
        console.log(this.competiciones[0])
      }
      this.busqueda.emit(this.competiciones[0].id)
    });
    
  }

  private CompeticionID(nombreLiga: string): number {
    var idLiga: number = this.competiciones[0].id;
    this.competiciones.every(
      (liga) => {
        if (nombreLiga == liga.nombre) {
          idLiga = liga.id;
          return false;
        }
        return true;
      }
    )
    return idLiga;

  }


  // buscar(evento: KeyboardEvent) {
  //   var valorBarra: string = (<HTMLInputElement>evento.target).value;
  //   this.busqueda.emit(valorBarra)
  // }

  ligaSelecionada(evento: Event):void {

    var nombreLiga = (<HTMLSelectElement>evento.target).value;
    var idLiga = this.CompeticionID(nombreLiga);
    // var valorBarra = this.barra_busqueda.nativeElement.value;
    // var datos: { equipo: string, idLiga: number } = {
    //   equipo: valorBarra,
    //   idLiga: idLiga
    // };
    this.busqueda.emit(idLiga)
  }

}
