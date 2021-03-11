import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private header: HttpHeaders;
  constructor(private http: HttpClient,) {
    this.header = new HttpHeaders();
    this.header = this.header.set("x-rapidapi-key", "1a82910bc7msh7be125e2efd8d07p17c1e8jsn3cdd92bb5c49");
    this.header = this.header.set("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

  }

  obtenerLigas(): Observable<Object> {

    return this.http.get<Object>("https://api-football-v1.p.rapidapi.com/v2/leagues/season/2019", { headers: this.header });
  }

  obtenerEquiposLiga(idLiga: Number): Observable<Object> {
    //https://api-football-v1.p.rapidapi.com/v2/teams/league/
    var url:string = "https://api-football-v1.p.rapidapi.com/v2/teams/league/".concat(idLiga.toString());
    return this.http.get<Object>(url, { headers: this.header });
  }
}
