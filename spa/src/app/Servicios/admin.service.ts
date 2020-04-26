import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  agregarCategoria(model: any) {
    return this.http.post(environment.UrlApi + 'Admin/Categoria' , model);
  }
  agregarModelo(model: any) {
    return this.http.post(environment.UrlApi + 'Admin/Modelo' , model);
  }
  agregarProducto(model: any) {
    return this.http.post(environment.UrlApi + 'Admin/Producto' , model);
  }
  obtenerFotos(idProyecto: number) {
    return this.http.get(environment.UrlApi + 'Admin/' + idProyecto + '/Fotos');
  }

  cambiarEstadoFoto(id: number, model: any){
    return this.http.put(environment.UrlApi + 'Admin/editar/' + id , model );
  }

  fotoPrincipal(idProducto: number, idFoto: number , model: any) {
    return this.http.post(environment.UrlApi + 'Admin/' + idProducto + '/esPrincipal/' + idFoto , model);
  }

  editarProducto(id: number , model: any) {
    return this.http.put(environment.UrlApi + 'Admin/' + id , model);
  }
  obtenerProducto() {
    return this.http.get(environment.UrlApi + 'Admin/Producto' );
  }
}
