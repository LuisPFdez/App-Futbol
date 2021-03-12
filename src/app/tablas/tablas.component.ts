import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent {
  @Input() claves!: Array<string>;
  @Input() datos!: Array<Array<string>>;
  @Output() salida: EventEmitter<any>;

  constructor(){
    this.salida = new EventEmitter();
  }
  clubSelecionado(elementoPadre: HTMLTableRowElement): void {
    var elementos:HTMLCollection = elementoPadre.children;
    // console.log(elemento);
    var datos:any = new Object;
    for (var i = 0; i < this.claves.length; i++) {
      datos[this.claves[i]] = elementos[i].innerHTML;
    }
    this.salida.emit(datos);
  }
}
