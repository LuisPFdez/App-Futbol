import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { from } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { PrincipalComponent } from './components/principal/principal.component';

import { HttpClientModule } from "@angular/common/http";
import { TablasComponent } from './components/tablas/tablas.component';
import { LoginComponent } from './components/login/login.component'


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
