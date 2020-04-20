import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from 'src/app/Models/Producto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort , {static: true}) sort: MatSort;
  displayedColumns: string[] = ['serie' , 'marca', 'cantidad', 'fecha_Registro', 'precio_Compra', 'precio_Venta', 'acciones'];
  productos: Producto[];
  dataSource = new MatTableDataSource();
  constructor() { }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.obtenerProductos();
  }
 obtenerProductos() {
    // this.retrogamer.obtenerProductos().subscribe((result: Producto[]) => {
    //   this.productos = result;
    //   this.dataSource.data = this.productos;
    // });
 }

 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
