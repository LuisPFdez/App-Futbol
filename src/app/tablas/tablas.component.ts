import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent  {
  @Input() claves!:Array<string>;
  @Input() datos!:Array<Array<string>>;
  // @Input() imagenes!:Array<string>;

}
