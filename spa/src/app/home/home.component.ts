import { Component, OnInit } from '@angular/core';
import { RetrogamerService } from '../Servicios/retrogamer.service';
import { Producto } from '../Models/Producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  constructor(private retrogamer: RetrogamerService) { }

  ngOnInit(): void {
  }
  obtenerProductos() {
    this.retrogamer.obtenerProductos().subscribe( (productos: Producto[]) => {

    });
  }
}
