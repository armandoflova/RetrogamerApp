import { Component, OnInit } from '@angular/core';
import { RetrogamerService } from '../Servicios/retrogamer.service';
import { Producto } from '../Models/Producto';
import { Categoria } from '../Models/Categoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  catgeorias: Categoria[] = [];
  constructor(private retrogamer: RetrogamerService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }
  obtenerProductos() {
    this.retrogamer.obtenerProductos().subscribe( (productos: Producto[]) => {
      this.productos = productos;
    });
  }
  obtenerCategorias() {
    this.retrogamer.obtenerCategorias().subscribe((categorias: Categoria[]) => {
      this.catgeorias = categorias;
    });
  }
}
