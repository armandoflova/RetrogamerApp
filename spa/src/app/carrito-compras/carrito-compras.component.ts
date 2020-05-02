import { Component, OnInit } from '@angular/core';
import { RetrogamerService } from '../Servicios/retrogamer.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})

export class CarritoComprasComponent implements OnInit {

  displayedColumns = ['Producto', 'Marca' , 'Modelo' , 'Precio' , 'acciones'];
  productos: any[] = [];
  dataSource = new MatTableDataSource();
  constructor(public retrogamer: RetrogamerService) { }

  ngOnInit(): void {
    this.cargarTabla();
  }
  cargarTabla() {
    this.productos = this.retrogamer.item;
    this.dataSource.data = this.productos;
  }
  getTotalCost() {
    return this.productos.map(p => p.precio).reduce((acc, value) => acc + value, 0);
  }
  eliminarItem(producto: any) {
    debugger;
    let i = this.productos.indexOf(producto, 0);
    this.retrogamer.item.splice(i , 1);
    this.productos.splice(i , 1);
    this.cargarTabla();
    this.retrogamer.precioTotal = this.getTotalCost();
    console.log(this.productos);
  }
}
