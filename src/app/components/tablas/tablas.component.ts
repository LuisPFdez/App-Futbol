import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})


//El componente TablasComponent recibe dos parametros para generar las tablas,
//La variable claves corresponderá a los titutos de los campos de la tabla, es un Array compuesto de strings
//La variable datos corresponde a los datos de la tabla, esta compuesto por un Array de Arrays, este ultimo esta compuesto por cualquier valor
//La razon de un doble array es por que cada array corresponde a una nueva linea, mientras los valores que contiene corresponde a los valores de los campos

export class TablasComponent {
  @Input() claves!: Array<string>;
  @Input() datos!: Array<Array<any>>;
  @Output() salida: EventEmitter<any>;

  constructor(){
    this.salida = new EventEmitter();
  }
  //Al pulsar en una fila, se lanzara el evento salida que generara un objeto con las claves de la tabla para las claves del objeto y 
  //los valores del campo para los valores
  clubSelecionado(elementoPadre: HTMLDivElement): void {
    var elementos:HTMLCollection = elementoPadre.children;
    // console.log(elemento);
    var datos:any = new Object;
    for (var i = 0; i < this.claves.length; i++) {
      datos[this.claves[i]] = elementos[i].innerHTML;
    }
    this.salida.emit(datos);
  }
}
