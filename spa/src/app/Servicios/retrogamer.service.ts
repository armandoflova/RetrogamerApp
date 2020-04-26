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
  obtenerCategorias() {
    return this.http.get(environment.UrlApi + 'RetroGamer/Categoria');
  }
  obtenerCategoria(idCategoria: number) {
    return this.http.get(environment.UrlApi + 'RetroGamer/Categoria/' + idCategoria);
  }
  obtenerModelos() {
    return this.http.get(environment.UrlApi + 'RetroGamer/Modelo');
  }
  obtenerModelo(idModelo: number) {
    return this.http.get(environment.UrlApi + 'RetroGamer/Modelo/' + idModelo);
  }
  obtenerProductos() {
    return this.http.get(environment.UrlApi + 'RetroGamer/Producto');
  }
  obtenerProducto(idProducto: number) {
    return this.http.get(environment.UrlApi + 'RetroGamer/Producto/' + idProducto);
  }
  obtenerFotos(idProyecto: number) {
    return this.http.get(environment.UrlApi + 'Retrogamer/' + idProyecto + '/Fotos');
  }
}
