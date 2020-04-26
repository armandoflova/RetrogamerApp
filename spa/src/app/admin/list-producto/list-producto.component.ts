import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from 'src/app/Models/Producto';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../Servicios/admin.service';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort , {static: true}) sort: MatSort;
  displayedColumns: string[] = ['nombre' , 'categoria' , 'modelo' , 'marca', 'cantidad', 
  'fecha', 'precioCompra', 'precioVenta', 'acciones'];
  productos: any[];
  dataSource = new MatTableDataSource();
  constructor(private admin: AdminService) { }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.obtenerProductos();
  }
 obtenerProductos() {
    this.admin.obtenerProducto().subscribe((result: any[]) => {
      this.productos = result;
      console.log(this.productos);
      
      this.dataSource.data = this.productos;
    });
 }

 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
