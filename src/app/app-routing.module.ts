import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from "./components/principal/principal.component"
import {EventosComponent} from "./components/eventos/eventos.component";
const routes: Routes = [
  {
    path: "",
    component: PrincipalComponent
  },
  {
    path:"eventos",
    component: EventosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
