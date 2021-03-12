import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { from } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { PrincipalComponent } from './principal/principal.component';

import { HttpClientModule } from "@angular/common/http";
import { TablasComponent } from './tablas/tablas.component';
import { LoginComponent } from './login/login.component'


@NgModule({
  declarations: [
    AppComponent,
    BarraBusquedaComponent,
    PrincipalComponent,
    TablasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
