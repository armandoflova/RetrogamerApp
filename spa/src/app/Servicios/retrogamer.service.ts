import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetrogamerService {
 
  constructor(private http: HttpClient) { }

  obtenerUbigeos(nroPadre: number) {
   return this.http.get(environment.UrlApi + 'RetroGamer/Ubigeo/' + nroPadre);
  }
}
