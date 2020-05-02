import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductoPedido } from '../Models/ProductoPedido';

@Injectable({
  providedIn: 'root'
})
export class RetrogamerService {
  item: any[] = [];
  precioTotal = 0;
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
  obtenerProductoVenta(idProducto: number) {
    return this.http.get(environment.UrlApi + 'RetroGamer/ProductoVenta/' + idProducto);
  }
  obtenerFotos(idProyecto: number) {
    return this.http.get(environment.UrlApi + 'RetroGamer/' + idProyecto + '/Fotos');
  }
  guardarPedido(userId: number , model: any) {
    return this.http.post(environment.UrlApi + 'RetroGamer/' + userId + '/Pedido' , model);
  }
  obtenerPedidos(userId: number) {
    return this.http.get(environment + 'RetroGamer/' + userId + '/Pedido');
  }
  agregarCarrito(productoPedido: any) {
    this.item.push(productoPedido);
    this.precioTotal += productoPedido.precio;
  }
}
