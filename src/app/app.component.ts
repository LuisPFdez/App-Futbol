import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "App-Futbol";
  usuario!: string;
  constructor(private toastr: ToastrService) { }
  usuarioF(nombre: string) {
    this.toastr.success("Bienvenido " + nombre, "Inicio de sesion exitoso")
    this.usuario = nombre;
  }
}